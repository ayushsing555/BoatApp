import {LightningElement, api, wire} from 'lwc';
import {refreshApex} from '@salesforce/apex';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { publish,MessageContext } from 'lightning/messageService';
import BOAT_MESSAGE from '@salesforce/messageChannel/BOATMC__c';

export default class BoatSearchResults extends LightningElement {
    @api boattypeid;
    allBoats;
    isLoadedData = false;
    @wire(MessageContext)messageContext;

    results;
    @wire(getBoats, {
        boatTypeId: '$boattypeid'
    }) wiredData(resultData) {
        this.results = resultData;
        if (resultData.data) {
            // console.log(this.boattypeid);
            // console.log(data);
            this.allBoats = resultData.data;
            this.isLoadedData = true;
            const message = {
                Boat:resultData.data
            }
            publish(this.messageContext,BOAT_MESSAGE,message);
        }
        else if (resultData.error) {
            console.log(resultData.error);
        }
    }

   async refreshData(){
     await refreshApex(this.results)
    }


    handleClick(event){
        this.removeClass();
        let selectedID = event.currentTarget.dataset.id;
        let selectToClass = this.template.querySelectorAll(`[data-id = "${selectedID}"]`);
        // console.log(selectToClass[0]);
        selectToClass[0].classList.add('select');
    }

    removeClass(){
        let SelectedClass = this.template.querySelectorAll('.select');
        if(SelectedClass.length>0){
            SelectedClass[0].classList.remove('select');
        }
        else{
            console.log("No class found");
        }
    }



    


}