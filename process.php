<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
// Check if $_POST is set
if ( empty ( $_POST['name'] ) ) {
 echo "Something wrong!";

 exit;
}
$name = $_POST['name'];
$m = new MongoClient();
//echo "Connection to database successfully";
// select a database
$address = array(
      'name'=>$name,
      'city' => 'test',
      'state' => 'test2',
      'zipcode' => 'test3'
      );

$db = $m->local;
//echo "Database mydb selected";
$collection = $db->user;
//echo "Collection selected succsessfully";
$collection->insert($address);

$user = $collection->findOne(array('name' => $name));
 ?>
<ul>

 <li><?php echo $user['name']; ?>: <?php echo $user['city']; ?></li>
<script>
    alert('test 1234');
 </script>
</ul>
