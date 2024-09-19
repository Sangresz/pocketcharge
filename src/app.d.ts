// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import RecordModel from 'pocketbase';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            pb: PocketBase;
            user: RecordModel | undefined;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
