/* These functions will call the PHP files used for saving and uploading your data.
You will only have to change the three string variables outside the functions. */

const save_url = "https://experiments-ccn.berkeley.edu/yourExp/save_data.php"; // URL of the save PHP file
const data_dir = "data";
const mail_url = "https://experiments-ccn.berkeley.edu/yourExp/data/mailer.php" // URL of the mailing PHP file

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
