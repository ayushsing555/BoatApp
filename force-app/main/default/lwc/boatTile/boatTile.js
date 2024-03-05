import { LightningElement,api, track, wire } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BOATMC__c';
import getBoats from '@salesforce/apex/BoatDataService.getBoats'
export default class BoatTile extends LightningElement {
    @api boat;
    @wire(MessageContext)messageContext;
    SelectId = '';
    isSelected = false;
    @track BoatData = [];
    filterData;
        @wire(getBoats,{
            boatTypeId:''
        })wiredData({data,error}){
            this.BoatData = data;
        }
    
    

    SelectedBoat(event){
        this.selectId = event.currentTarget.dataset.id;
        this.filterData = this.BoatData.filter(elem=>{
            return elem.Id==this.selectId
        })
            const message = {
            boatId:this.selectId,
            Boat:this.filterData
            }
        publish(this.messageContext,BOATMC,message);
        
    }
}