<?php
$services_json = json_decode(getenv("VCAP_SERVICES"),true);
$mongo_config = $services_json["mongodb-1.8"][0]["credentials"];
$username = $mongo_config["username"];
$password = $mongo_config["password"];
$hostname = $mongo_config["hostname"];
$port = $mongo_config["port"];
$db = $mongo_config["db"];
$name = $mongo_config["name"]; 
$connect = "mongodb://${username}:${password}@${hostname}:${port}/${db}";
$m = new Mongo($connect);
$coll = $m->selectCollection("mongoDB");
print_r($coll);

//$coll = $m->phptest;
//$coll->insert(array("user" => "demo@9lessons.info","password" => md5("admin")));
//print_r($coll->find());

?>
