import { LightningElement, wire ,track} from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
import { NavigationMixin } from 'lightning/navigation';
export default class BoatSearchForm extends NavigationMixin(LightningElement) {
    @track selectBoatTypeId="";
    error = undefined;
    searchOptions;
    @wire(getBoatTypes)wiredData({data,error}){
        if(data){
            this.searchOptions = data.map(type=>{
               return {
                    label:type.Name,
                    value:type.Id
                }
            });
            console.log(JSON.stringify(this.searchOptions))
        }
        else if(error){
            this.searchOptions = undefined;
            this.error = error
        }
    }

    handleSearchOptionChange(event){
        this.selectBoatTypeId  = event.target.value;
    }

    createNewBoat(){
        const pageRef = {
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Boat__c',
                actionName:'new'
            }
        }
        this[NavigationMixin.Navigate](pageRef);
    }

}