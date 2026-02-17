import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setCollection<T>(key: string, value: T[]): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getCollection<T>(key: string): T[] {
    const item = sessionStorage.getItem(key);
    if (!item) return [];

    try {
      return JSON.parse(item) as T[];
    } catch {
      return [];
    }
  }

  addToCollection<T>(key: string, value: T): void {
    const current = this.getCollection<T>(key);
    current.push(value);
    this.setCollection(key, current);
  }

  updateInCollection<T extends { id: number }>(key: string, updated: T): void {
    const current = this.getCollection<T>(key);

    const index = current.findIndex((x) => x.id === updated.id);
    if (index === -1) return;

    current[index] = updated;

    this.setCollection(key, current);
  }

  removeFromCollection<T extends { id: number }>(key: string, id: number): void {
    const current = this.getCollection<T>(key);
    const filtered = current.filter((x) => x.id !== id);

    this.setCollection(key, filtered);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
