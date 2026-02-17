import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setInSessionStorage(key: string, value: unknown) {
    const hasValue = !!this.isJsonString(this.getFromSessionStorage(key));
    let itemList = new Array();

    if (hasValue) {
      const items = this.getFromSessionStorage(key) as Array<any>;
      itemList = [...items, value];
    }

    sessionStorage.setItem(key, JSON.stringify(itemList));
  }

  getFromSessionStorage(key: string) {
    return this.isJsonString(sessionStorage.getItem(key));
  }

  removeFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  isJsonString(str: string | null) {
    let obj = null;
    if (str !== null)
      try {
        obj = JSON.parse(str);
      } catch (e) {
        return new Error('Object is Not a Valid Json');
      }
    return obj;
  }
}
