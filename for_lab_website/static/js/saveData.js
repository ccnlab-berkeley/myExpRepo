/* These functions will call the PHP files used for saving and uploading your data.
You will only have to change the three string variables outside the functions. */

// URL of where the PHP file is located -- replace with whatever website/directory you end up using
 const save_url = "https://experiments-ccn.berkeley.edu/demoRLWM/save_data.php"; 
// name of folder where data will be saved
const data_dir = "data";

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
