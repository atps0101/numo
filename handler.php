<?php
if (!empty($_POST["form"]) || !empty($_POST["email"]) && filter_var($_POST["email"]) ) {

    header('Content-Type: application/json'); 


    if ($_POST["form"] == 'subscribe' && !filter_var($_POST["email"])) {
        header("HTTP/1.1 404 Not Found");
        header("Location: /404");
        exit;
    }

    $formData = array();

    $formData = array(
        "resource" => $_SERVER["HTTP_HOST"]
    );




    if (isset($_POST["form"]) && $_POST["form"] != 'subscribe') {
    
        if (isset($_POST["name"])) {
            $formData["name"] = $_POST["name"];
            
            if (mb_strlen($formData["name"], 'UTF-8') < 2 || mb_strlen($formData["name"], 'UTF-8') > 15) {
                echo json_encode(array("status" => "error", "input" => "name", "message" => $message));
                exit;
            }
        } else {
            echo json_encode(array("status" => "error", "input" => "name", "message" => $message));
            exit;
        }
        
        if (isset($_POST["phone"])) {
            $phone = preg_replace('/[^\d]/', '', $_POST["phone"]);   
            if (strlen($phone) === 12) {
                $formData["phone"] = $phone;
            } else {
                echo json_encode(array("status" => "error", "input" => "phone"));
                exit;
            }
        }

    }

    if (isset($_POST["email"]) && !empty($_POST["email"])) {
        if (filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $formData["email"] = $_POST["email"];
        }else{
            echo json_encode(array("status" => "error", "input" => "email"));
            exit;
        }
    } 
    
    if(isset($formData)){

        foreach ($_POST as $key => $value) {
            if (!isset($formData[$key])) {
                $formData[$key] = $value;
            }
        }
        
        $jsonFormData = json_encode($formData);

        $url = "https://hook.eu2.make.com/5qswe42ywkvce17vypk1xkrcahr1c5yb";
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonFormData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
    
        $responseData = json_decode($response, true);
    
        $status = $responseData["status"];


        echo json_encode(array("status" => $status));
    }else{
        header("HTTP/1.1 404 Not Found");
        header("Location: /404");
        exit;
    }

 
} else {
    
    header("HTTP/1.1 404 Not Found");
    header("Location: /404");
    exit;
    
}
?>