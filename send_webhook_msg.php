<?php
$webhookurl = "YOUR_WEBHOOK_URL";

$timestamp = date("c", strtotime("now"));

$json_data = json_encode([

    "content" => "Hello :) This is the description..... Thanks <@440916065023950868>",
    
    // Name & Avatar set in webhook
    //"username" => "Reha Addon",
    //"avatar_url" => "",

    // File upload
    // "file" => "",

    // Embeds Array
    "embeds" => [
        [
            // Embed Title
            "title" => "PHP - Send message to Discord (embeds) via Webhook",

            // Embed Type
            "type" => "rich",

            // Embed Description
            "description" => "Description will be here, someday, you can mention users here also by calling userID <@440916065023950868>",

            // URL of title link
            //"url" => "",

            // Timestamp of embed must be formatted as ISO8601
            "timestamp" => $timestamp,

            // Embed left border color in HEX
            "color" => hexdec("3366ff"),

            // Footer
            "footer" => [
                "text" => "github.com/reha-plutoz",
                "icon_url" => "https://avatars.githubusercontent.com/u/48756305?s=96&v=4"
            ],

            // Image to send
            "image" => [
                "url" => "https://avatars.githubusercontent.com/u/48756305?s=96&v=4"
            ],

            // Thumbnail
            //"thumbnail" => [
            //    "url" => ""
            //],

            // Author
            "author" => [
                "name" => "Reha",
                "url" => "https://crmnl.dev/"
            ],

            // Additional Fields array
            "fields" => [
                // Field 1
                [
                    "name" => "Field #1 Name",
                    "value" => "Field #1 Value",
                    "inline" => false
                ],
                // Field 2
                [
                    "name" => "Field #2 Name",
                    "value" => "Field #2 Value",
                    "inline" => true
                ]
                // Etc..
            ]
        ]
    ]

], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );


$ch = curl_init($webhookurl);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec( $ch );

curl_close( $ch );
