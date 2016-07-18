<?php
	//connect to db
	$con = mysql_connect('localhost','root', '');
	$db	 = mysql_select_db('blog');
 
	//if insert key is pressed then do insertion
	if($_POST['action'] == 'insert'){
 
		$name  = mysql_real_escape_string($_POST['name']);
		$email = mysql_real_escape_string($_POST['email']);
 
		$sql   = "insert into mytable (name, email) values ('$name', '$email')";
		$query = mysql_query($sql);
		if($query){
			echo "Record Inserted.";
		}else {
			echo "Something Wrong!";
		}
	}
	//if show key is pressed then show records
	if($_POST['action'] == 'show'){
		$sql   = "select * from mytable order by id desc limit 10";
		$query = mysql_query($sql);
 
		echo "<table border='1'>";
		while($row = mysql_fetch_assoc($query)){
			echo "<tr><td>$row[id]</td><td>$row[name]</td><td>$row[email]</td></tr>";
		}
		echo "</table>";
	}






?>
