import { LightningElement,api, wire } from 'lwc';
import SingleBoatDetails from '@salesforce/apex/BoatDataService.SingleBoatDetails';
import { NavigationMixin } from 'lightning/navigation';
export default class BoatDetail extends NavigationMixin(LightningElement) {
     @api boatid
     boatDetails;
     @wire(SingleBoatDetails,{
        BoatId:'$boatid'
     })wiredData({data,error}){
        if(data){
            this.boatDetails = data[0];
        }
        else if(error){
            this.boatDetails = error
        }
     }
     handleDetail(){
        const pageRef = {
            type:'standard__recordPage',
            attributes:{
                recordId:this.boatid,
                actionName:'view'
            }
        }
        this[NavigationMixin.Navigate](pageRef);
     }

     
}