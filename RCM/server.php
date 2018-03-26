<?php

session_start();
$username = "";
$email = "";
$errors = array();

// connect to mysql db
$db = mysqli_connect('localhost','root','','nodedb');
$sql= "INSERT INTO createaccount  VALUES ('test')";
    mysqli_query($db,$sql);
    
//if user clicks on register button

if(isset($_POST['register'])) {
	$first_name = mysqli_real_escape_string($db,$_POST['first_name']);
	$last_name =  mysqli_real_escape_string($db,$_POST['last_name']);
	$username =   mysqli_real_escape_string($db,$_POST['username']);
	$email =      mysqli_real_escape_string($db,$_POST['email']);
	$password =   mysqli_real_escape_string($db,$_POST['password']);
	$password2 =  mysqli_real_escape_string($db,$_POST['password2']);
	
//if fields are empty
	//if(empty($first_name)){
		//array_push($errors,"first_name can't be left blank");
//	}
	//	if(empty($last_name)){
		//array_push($errors,"last_name can't be left blank");
		//}
		//if(empty($username)){
		//array_push($errors,"Username can't be left blank");
		//}
		//if(empty($email)){
		//array_push($errors,"email can't be left blank");
		//}
		//if(empty($password)){
		//array_push($errors,"password can't be left blank");
		//}
		//if($password != $password2){
		//array_push($errors,"Passwords does not match!");
	//}
		
	
	//if there is no error, save user to db
	if(count($errors) == 0){
	$password1 = md5($password); //password encryption before storing in db
	$sql= "INSERT INTO createaccount (first_name,last_name,username,email,password) VALUES ('$first_name','$last_name','$username','$email','$password1')";
	mysqli_query($db,$sql);
	$_SESSION['username'] = $username;
	//$_SESSION['success'] = "You are logged in";
	header('location: logged_in.php'); //Redirect to home Page
	}

}

// for categories
if(isset($_POST["category"])){
	$category_query = "SELECT * FROM categories";
	$run_query = mysqli_query($db,$category_query) or die(mysqli_error($db));
	echo "
		<div class='nav nav-pills nav-stacked'>
			<li class='active'><a href='#'><h4>Categories</h4></a></li>
	";
	if(mysqli_num_rows($run_query) > 0){
		while($row = mysqli_fetch_array($run_query)){
			$cid = $row["cat_id"];
			$cat_name = $row["cat_title"];
			echo "
					<li><a href='#' class='category' cid='$cid'>$cat_name</a></li>
			";
		}
		echo "</div>";
	}
}


//log user in from login page
if(isset($_POST['login'])){
	$username = mysqli_real_escape_string($db,$_POST['username_login']);
	$password = mysqli_real_escape_string($db,$_POST['password_login']);
	
	
		if(count($errors) == 0){
		 $password1 = md5($password);
		 $query = "SELECT * FROM createaccount WHERE username = '$username' AND password = '&password1'";
		 $result = mysqli_query($db,$query)or die(mysqli_error($db));
		 
			if(mysqli_num_rows($result)==0){
				array_push($errors,mysqli_num_rows($result));
			//log in user
			//alert("Hi");
			//$_SESSION['username'] = $username;
			//$_SESSION['success'] = "You are logged in";
		//header('location:logged_in.php');//redirect to home page
			}else{
				
				array_push($errors,"Wrong credentials");
			}
			
			//$row = mysqli_fetch_array($result);
			//echo "$password1";
			//if($row['username_login'] == $username && $row['password_login'] == $password1){
				//echo "Login successfull !  Welcome".$row['username'];
				//}else{echo "failed!!";}
			}
		}
 //login braces closed
		
//logout
if(isset($_GET['logout'])){
	session_destroy();
unset($_SESSION['username']);
	header('location: indexMyntra.php');
}
?>