import { LightningElement ,wire,api} from 'lwc';
import { subscribe,MessageContext, unsubscribe } from 'lightning/messageService';
import BOAT_MESSAGE_c from '@salesforce/messageChannel/BOATMC__c';

export default class BoatMap extends LightningElement {
    mapMarkers = [];
    subscription = null;
    @wire(MessageContext)messageContext;
    @api allboats;
    
    connectedCallback(){
        this.subscription = subscribe(this.messageContext,BOAT_MESSAGE_c,(message)=>{
            this.handleBoatListUpdate(message);
        })
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleBoatListUpdate(message){
        this.mapMarkers = message.Boat.map(boat=>{
            const Latitude  = boat.Geolocation__Latitude__s;
            const Longitude = boat.Geolocation__Longitude__s;
            return{
                location:{Latitude,Longitude},
                title:boat.Name,
                description:`coords:${Latitude},${Longitude}`,
                icon:'utility:animal_and_nature'
            }
        })
    }
}