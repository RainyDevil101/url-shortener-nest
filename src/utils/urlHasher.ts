import { createHash } from 'crypto';

export class UrlHasher {
  static hash(url: string): string {
    const hash = createHash('sha256');
    hash.update(url);
    return hash.digest('hex').slice(0, 6);
  }
}
