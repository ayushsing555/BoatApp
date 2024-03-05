import { LightningElement, track, wire } from 'lwc';
import { subscribe,unsubscribe,MessageContext } from 'lightning/messageService';
import BoatReviews from '@salesforce/apex/BoatDataService.getAllReviews'
import BOATMC from '@salesforce/messageChannel/BOATMC__c';
import { refreshApex } from '@salesforce/apex';
export default class BoatReviewDetail extends LightningElement {
    @wire(MessageContext)messageContext;
    subscription = null;
    @track selectedBoatId;
    connectedCallback(){
        this.subscription = subscribe(this.messageContext,BOATMC,(message)=>{
            this.selectedBoatId = message.boatId
        })
    }
    getResults;

    @track BoatReviewData;
     @wire(BoatReviews,{
        boatId:'$selectedBoatId'
     })wireData(results){
        this.getResults = results;
        if(results.data){
            this.BoatReviewData = results.data;
        }
        else if(results.error){
            console.log(results.errors);
        }
     }
     refreshData() { 
        console.log(":ayush");
return refreshApex(this.getResults);
}

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}