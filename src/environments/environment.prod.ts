// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// http://assetscube.com/api


export const environment = {
  production: false,
  TknAddSites: ["https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev","http://assetscube.com/api"],
  //Fund Allocation screen
  FundAllocapiUrl: "http://assetscube.com/api",
  FundAllocfetch: "getfundaloc",
  FundAllocSave:"savefundaloc",
  bsecustUrl:"http://assetscube.com/api",
  bseCustcreate:"custcreation",
  bsemandatetUrl:"http://assetscube.com/api",
  bseMandataecreate:"mandatecreation",
  // SetJwtapiUrl: 'https://www.saplingclub.com/natkeyss',
  // SetJwtapiUrl: 'https://n54fu4lte2.execute-api.ap-southeast-1.amazonaws.com/dev/natkeyss',
  // SetJwtapiUrl: 'https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev',
  // SetJwtapiUrl: 'http://assetscube.com/api',
  SetJwtapiUrl: 'http://assetscube.com/api',
  SetJwtapiSave: 'natkeyss',
  firebase: {
    apiKey: "AIzaSyDQg2KUEAJaj-bfdQfp_08T6L2ybnpbOSc",
    authDomain: "ananew-472d8.firebaseapp.com",
    databaseURL: "https://ananew-472d8.firebaseio.com",
    projectId: "ananew-472d8",
    storageBucket: "ananew-472d8.appspot.com",
    messagingSenderId: "753856447807"
  },
  //RecordSignupapiUrl:"https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev",
  RecordSignupapiUrl:"http://assetscube.com/api",
  RecordSignupapiSave:"signup",
  //IFSCfetchapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  IFSCfetchapiUrl:'http://assetscube.com/api',
  IFSCapifetch:"bankdet",
  //notifiapiUrl :"https://816ug405pd.execute-api.ap-southeast-1.amazonaws.com/allprocessingdev",
  notifiapiUrl: 'http://assetscube.com/api',
  notififetch: 'notification',
  //registapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  registapiUrl:'http://assetscube.com/api',
  registfetch:"registdetfetch",
  //registfrmapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  registfrmapiUrl: 'http://assetscube.com/api',
  detailsfrmsave:'dtlfrmsave',
 /* detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"*/
  regisfrmsubmit:"regisandfatcsubmit",
  //Fileupload EndPoints START
  FileuploadUrl:"http://assetscube.com/api",
  //FileuploadUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  FileUpload:"uploadfile",
  Filelist:"uploadedfilelist",
  Filedelete:"uploadedfiledelete",
  Finalsubmit:"uploadedfilesubmit",
  // Fileupload EndPoints END
  pfUrl: 'http://assetscube.com/api',
  pffetch: 'pfdatafetch',
  executepf: 'executepf',
  pfsave: 'pfdatasave',
  pfmainfetch: 'onlypf',
  dashUrl: 'http://assetscube.com/api',
  getdata: 'dashfetchdata',
  chartdata: 'dashchart',
  pfdet: 'dashpfdet',
  dashchart: 'dashchart',
  fundUrl: 'http://assetscube.com/api',
  // fundUrl:"http://127.0.0.1:5000/",
  fundfetch: 'funddatafetch',
  orderplaceUrl: 'http://assetscube.com/api',
  detailsfetch: 'ordplacedetails',
  mforderUrl: 'http://assetscube.com/api',
  mforderfetch: 'mforderdatafetch',
  mfsaveforlater: 'mfordersave',
  mfsubmitmorder: 'mfordersubmit',
  mfvalidatemorder: 'mfordervalidate',
  mforderpayment: 'mforderpayment',
  mforderdetails: 'mforderdetails',
  mfordpaystaus: 'mfordpaystatus',
  orderhistUrl: 'http://assetscube.com/api',
  orderhistfetch: 'orderhistfetch'
};
