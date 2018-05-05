// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  TknAddSites: ["https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev"],
  //Fund Allocation screen
  FundAllocapiUrl: "http://127.0.0.1:8000",
  FundAllocfetch: "getfundaloc",
  FundAllocSave:"savefundaloc",
  bsecustUrl:"http://127.0.0.1:8000",
  bseCustcreate:"custcreation",
  bsemandatetUrl:"http://127.0.0.1:8000",
  bseMandataecreate:"mandatecreation",
  SetJwtapiUrl: 'https://www.saplingclub.com/natkeyss',
  // SetJwtapiUrl: 'https://n54fu4lte2.execute-api.ap-southeast-1.amazonaws.com/dev/natkeyss',
  // SetJwtapiUrl: 'https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev',
  // SetJwtapiUrl:"http://127.0.0.1:8000",
  SetJwtapiSave: 'natkeyss',
  firebase: {
    apiKey: "AIzaSyAU9KLFWZ0YuHXuG8tLBLAg9ax3gJPKxck",
    authDomain: "rare-origin-161911.firebaseapp.com",
    databaseURL: "https://rare-origin-161911.firebaseio.com",
    projectId: "rare-origin-161911",
    storageBucket: "rare-origin-161911.appspot.com",
    messagingSenderId: "474890725243"
  },
  RecordSignupapiUrl:"https://izsp1n5tfl.execute-api.ap-southeast-1.amazonaws.com/dev",
  //RecordSignupapiUrl:"http://127.0.0.1:8000",
  RecordSignupapiSave:"signup",
  IFSCfetchapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  IFSCapifetch:"bankdet",
  notifiapiUrl :"https://816ug405pd.execute-api.ap-southeast-1.amazonaws.com/allprocessingdev",
  //notifiapiUrl :"http://127.0.0.1:8000",
  notififetch:"notification",
  //registapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  registapiUrl:"http://127.0.0.1:8000",
  registfetch:"registdetfetch",
  registfrmapiUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  detailsfrmsave:"dtlfrmsave",
 /* detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"*/
  regisfrmsubmit:"regisandfatcsubmit",
  //Fileupload EndPoints START
  //FileuploadUrl:"http://127.0.0.1:8000",
  FileuploadUrl:"https://o7cm2vmfq4.execute-api.ap-southeast-1.amazonaws.com/dev",
  FileUpload:"uploadfile",
  Filelist:"uploadedfilelist",
  Filedelete:"uploadedfiledelete",
  Finalsubmit:"uploadedfilesubmit",
  // Fileupload EndPoints END
  pfUrl: 'http://127.0.0.1:8000',
  pffetch: 'pfdatafetch',
  executepf: 'executepf',
  pfsave: 'pfdatasave',
  pfmainfetch: 'onlypf',
  fundUrl: 'http://127.0.0.1:8000',
  // fundUrl:"http://127.0.0.1:5000/",
  fundfetch: 'funddatafetch',
  mforderUrl: 'http://127.0.0.1:8000',
  mforderfetch: 'mforderdatafetch',
  mfsaveforlater: 'mfordersave',
  mfsubmitmorder: 'mfordersubmit',
  mfvalidatemorder: 'mfordervalidate',
  mforderpayment: 'mforderpayment',
};
