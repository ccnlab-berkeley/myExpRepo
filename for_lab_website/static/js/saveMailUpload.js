/* These functions will call the PHP files used for saving and uploading your data.
You will only have to change the three string variables outside the functions. */

// URL of where the PHP files are located -- replace with whatever website/directory you end up using
 const save_url = "https://experiments-ccn.berkeley.edu/demoRLWM/save_data.php";
 const upload_url = "https://experiments-ccn.berkeley.edu/demoRLWM/uploader.php";
 const mail_url = "https://experiments-ccn.berkeley.edu/demoRLWM/data/mailer.php";
// name of folder where data will be saved
const data_dir = "data";

// save data as csv
const save_data_csv = function(file_name,toSave) {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv',
            exp_data: toSave.csv()
        }
    });
}

// mail data as csv
const mail_data_csv = function(file_name) {
  jQuery.ajax({
        type: 'post',
        cache: false,
        url: mail_url,
        data: {
            file_name: file_name + '.csv',
        }
    });
}

// upload data as json
const upload_data_csv = function(file_name) {
  jQuery.ajax({
    type: 'post',
    cache: false,
    url: upload_url,
    data: {
      data_dir: data_dir,
      file_name: file_name + '.csv',
    }
  });
}

// save data as json
const save_data_json = function(file_name,toSave) {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.json',
            exp_data: toSave.json()
        }
    });
}

// mail data as json
const mail_data_json = function(file_name) {
  jQuery.ajax({
        type: 'post',
        cache: false,
        url: mail_url,
        data: {
            file_name: file_name + '.json',
        }
    });
}

// upload data as json
const upload_data_json = function(file_name) {
  jQuery.ajax({
    type: 'post',
    cache: false,
    url: upload_url,
    data: {
      data_dir: data_dir,
      file_name: file_name + '.json',
    }
  });
}
