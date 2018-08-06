// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// in case of prod change "http://127.0.0.1:8080" to "http://assetscube.com".

export const environment = {
  production: false,
  TknAddSites: ["https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev","http://127.0.0.1:8080"],
  //Fund Allocation screen
  FundAllocapiUrl: "http://127.0.0.1:8080",
  FundAllocfetch: "getfundaloc",
  FundAllocSave:"savefundaloc",
  bsecustUrl:"http://127.0.0.1:8080",
  bseCustcreate:"custcreation",
  bsemandatetUrl:"http://127.0.0.1:8080",
  bseMandataecreate:"mandatecreation",
  // SetJwtapiUrl: 'https://www.saplingclub.com/natkeyss',
  // SetJwtapiUrl: 'https://n54fu4lte2.execute-api.ap-southeast-1.amazonaws.com/dev/natkeyss',
  // SetJwtapiUrl: 'https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev',
  SetJwtapiUrl: 'http://127.0.0.1:8080',
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
  RecordSignupapiUrl:"http://127.0.0.1:8080",
  RecordSignupapiSave:"signup",
  //IFSCfetchapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  IFSCfetchapiUrl:'http://127.0.0.1:8080',
  IFSCapifetch:"bankdet",
  //notifiapiUrl :"https://816ug405pd.execute-api.ap-southeast-1.amazonaws.com/allprocessingdev",
  notifiapiUrl: 'http://127.0.0.1:8080',
  notififetch: 'notification',
  //registapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  registapiUrl:'http://127.0.0.1:8080',
  registfetch:"registdetfetch",
  //registfrmapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  registfrmapiUrl: 'http://127.0.0.1:8080',
  detailsfrmsave:'dtlfrmsave',
 /* detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"*/
  regisfrmsubmit:"regisandfatcsubmit",
  //Fileupload EndPoints START
  FileuploadUrl:"http://127.0.0.1:8080",
  //FileuploadUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  FileUpload:"uploadfile",
  Filelist:"uploadedfilelist",
  Filedelete:"uploadedfiledelete",
  Finalsubmit:"uploadedfilesubmit",
  // Fileupload EndPoints END
  pfUrl: 'http://127.0.0.1:8080',
  pffetch: 'pfdatafetch',
  executepf: 'executepf',
  pfsave: 'pfdatasave',
  pfmainfetch: 'onlypf',
  dashUrl: 'http://127.0.0.1:8080',
  getdata: 'dashfetchdata',
  chartdata: 'dashchart',
  pfdet: 'dashpfdet',
  dashchart: 'dashchart',
  fundUrl: 'http://127.0.0.1:8080',
  // fundUrl:"http://127.0.0.1:5000/",
  fundfetch: 'funddatafetch',
  orderplaceUrl: 'http://127.0.0.1:8080',
  detailsfetch: 'ordplacedetails',
  mforderUrl: 'http://127.0.0.1:8080',
  mforderfetch: 'mforderdatafetch',
  mfsaveforlater: 'mfordersave1',
  mfsubmitmorder: 'mfordersubmit',
  mfvalidatemorder: 'mfordervalidate',
  mforderpayment: 'mforderpayment',
  mforderdetails: 'mforderdetails',
  mfordpaystaus: 'mfordpaystatus',
  orderhistUrl: 'http://127.0.0.1:8080',
  orderhistfetch: 'orderhistfetch',
  mandateUrl: 'http://127.0.0.1:8080',
  mandatefetch: 'getmandate',
  mandateops: 'mandateops',
  test: 'mandatestatus'
};
