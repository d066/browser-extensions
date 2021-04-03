import axios from 'axios';
import { LoggingManager } from './Logging';
import { StorageManager } from './Storage';




declare var browser: any;

export class DomainManager {



    public static getDomain(url: string) {
        LoggingManager.debug("DomainManager:getDomain", "Getting domain from", url);
        const anchor = document.createElement('a');
        anchor.href = url;
        if (['http:', 'https:'].includes(anchor.protocol)) {
            if (anchor.hostname.startsWith('www.')) {
                LoggingManager.debug("DomainManager:getDomain", "Retrieved hostname from www", anchor.hostname.substr(4));
                return anchor.hostname.substr(4);
            }
            LoggingManager.debug("DomainManager:getDomain", "Retrieved hostname from anchor", anchor.hostname);
            return anchor.hostname;
        }
        LoggingManager.debug("DomainManager:getDomain", "Failed to retrieve hostname", anchor.hostname);
        return null;
    }

    public static getService(tab: any) {
        LoggingManager.debug("DomainManager:getService", "Getting domain from tab", tab);
        const domain = this.getDomain(tab.url);
        LoggingManager.debug("DomainManager:getService", "Getting service details from domain", domain);
        return StorageManager.getServiceDetails(domain);
    }



}