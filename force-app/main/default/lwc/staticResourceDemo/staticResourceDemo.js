import { LightningElement, wire } from 'lwc';
import LOGO from '@salesforce/resourceUrl/MyLogo';
import CONTENT_ASSEST from '@salesforce/contentAssetUrl/myAssestLogo';
import GREETING from '@salesforce/label/c.greeting';
import SALESFORCE_PLATFORM from '@salesforce/label/c.salesforcePlatform'
import USER_ID from '@salesforce/user/Id';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import DISPLAY_TEXT from '@salesforce/customPermission/displayText';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import ANIMATE_RESOURSE from '@salesforce/resourceUrl/ThirdPartyCss_Animate';
import MOMENT_LIB from '@salesforce/resourceUrl/ThirdPartyJs_MomentLib';

export default class StaticResourceDemo extends LightningElement {

    name = "";
    displaDate = "";
    isFirstLoad = true;
    myLogoImage = LOGO;
    myLogoAssest = CONTENT_ASSEST;
    label = {
        platform: SALESFORCE_PLATFORM,
        greeting: GREETING
    };

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) recordDetails({ data, error }) {
        if (data) {
            console.log("Loged In User Details", data);
            this.name = getFieldValue(data, NAME_FIELD);
        } else if (error) {
            console.log("Error while fetching record details", error);
        }
    }

    renderedCallback() {
        if (this.isFirstLoad) {
            this.isFirstLoad = false;
            Promise.all([loadStyle(this, ANIMATE_RESOURSE), loadScript(this, MOMENT_LIB)])
                .then(() => {
                    console.log("File loaded successfulle.");
                    this.fetchDate();
                })
                .catch((error) => {
                    console.log("File loading failed.", error);
                });
        }
    }

    get checkPermission() {
        return DISPLAY_TEXT;
    }

    fetchDate(){
        this.displaDate = moment().format('LLLL');
    }
}