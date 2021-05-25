<?php
function sendNotification(){
    $url ="https://localhost:8080/pushNotifications";

    $fields=array(
        "to"=>$_REQUEST['token'],
        "notification"=>array(
            "body"=>$_REQUEST['message'],
            "title"=>$_REQUEST['title'],
            "icon"=>$_REQUEST['icon'],
            "click_action"=>"https://google.com"
        )
    );

    $headers=array(
        'Authorization: key=AAAA_cdToPc:APA91bEAR_ZkGSjm6wGDI2VBtFUKmmQJjzFDYNw0QO9tbkafID7RWb2_cyXisGUotOytPIIdWL_5rrkrbTKYNzXT4ifCO9_Xmh4q0BVobrB-YWlatmZ6UkFwwP4pCEVZfmpbX6_mCQLE',
        'Content-Type:application/json'
    );

    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,true);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($fields));
    $result=curl_exec($ch);
    print_r($result);
    curl_close($ch);
}
sendNotification();