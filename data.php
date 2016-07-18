
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
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