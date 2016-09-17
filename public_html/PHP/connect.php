<?php
  $serwer = "dev-live.co.uk";
  $user = "devlivec_marek";
  $password = "marek123";
  $db = "devlivec_storage";
  $con = mysql_connect($serwer,$user,$password);
  $dbo = mysql_select_db($db);