import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { NotificationService, PushSubscription } from './generated';


@Injectable({
  providedIn: 'root'
})
export class NotificationMiddlewareService {
  public pushNotificationStatus = {
    isSubscribed: false,
    isSupported: false,
    isInProgress: false
  };
  public notifications = [];
  private swRegistration:ServiceWorkerRegistration|null = null;
  constructor(private notificationService: NotificationService) { }
  init() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/assets/sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);

          this.swRegistration = swReg;
          this.checkSubscription();
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
      this.pushNotificationStatus.isSupported = true;
    } else {
      this.pushNotificationStatus.isSupported = false;
    }
  }

  checkSubscription() {
    this.swRegistration!.pushManager.getSubscription()
      .then((subscription:any) => {
        console.log(subscription);
        console.log(JSON.stringify(subscription));
        this.pushNotificationStatus.isSubscribed = !(subscription === null);
      });
  }

  toggleSubscription() {
    if (this.pushNotificationStatus.isSubscribed) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  subscribe() {
    this.pushNotificationStatus.isInProgress = true;

    const applicationServerKey = this.urlB64ToUint8Array(environment.applicationServerPublicKey);
    this.swRegistration!.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(subscription => {
        console.log(subscription);
        console.log(JSON.parse(JSON.stringify(subscription)));

        var newSub = JSON.parse(JSON.stringify(subscription));
        console.log(newSub);
        this.notificationService.subscribe(<PushSubscription>{
          auth: newSub.keys.auth,
          p256Dh: newSub.keys.p256dh,
          endPoint: newSub.endpoint
        }).subscribe((s:any) => {
          this.pushNotificationStatus.isSubscribed = true;
        })
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      })
      .then(() => {
        this.pushNotificationStatus.isInProgress = false;
      });
  }

  unsubscribe() {
    this.pushNotificationStatus.isInProgress = true;
    this.swRegistration!.pushManager.getSubscription()
      .then(function (subscription) {
        if (subscription) {
         var sub = JSON.parse(JSON.stringify(subscription));

        }
        return subscription!.unsubscribe();

      })
      .catch(function (error) {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        this.pushNotificationStatus.isSubscribed = false;
        this.pushNotificationStatus.isInProgress = false;
      });
  }


  //DEFINICIJA BASE64STRING
  urlB64ToUint8Array(base64String:any) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
