<!--
	---------------------------------
	-- Trabalho Individual -- FCSH --
	---------------------------------
	-- Nuno Marques ------ (54338) --
	---------------------------------
-->


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Exotic Garden</title>
		<meta name="description" content="Exotic Garden created by Will Giles" />
		<meta name="keywords" content="exotic garden, will giles, tours, workshops, botanic artist" />
		<meta name="author" content="Nuno Marques" />

		<link rel="shortcut icon" href="img/favicon.ico">
		<link rel="apple-touch-icon" href="img/favicon.png">

		<link href="https://fonts.googleapis.com/css?family=Amaranth:400,400i,700,700i" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/exotic-garden.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/scalize.min.css">
		<link rel="stylesheet" type="text/css" href="css/pignose.calendar.min.css">
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="js/modernizr.js"></script>
	</head>

	<body>
		
		<div id="header">

			<!-- Fixed navbar -->
			<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
				<a class="navbar-brand <?php if (stripos($_SERVER['REQUEST_URI'],'index.php') !== false) {echo 'active';} ?>" href="index.php"><img src="img/logo.svg" width="38px" id="logo" class="float-left" alt="Exotic Garden - Home" /> <h1 class="hidden-md-up">Exotic Garden</h1></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">

					<ul class="menu navbar-nav mr-auto" id="menu">
						<li class="nav-item <?php if (stripos($_SERVER['REQUEST_URI'],'the-garden.php') !== false) {echo 'active';} ?>" >
							<a class="nav-link" href="the-garden.php">The Garden</a>
						</li>
						<li class="nav-item <?php if (stripos($_SERVER['REQUEST_URI'],'tours.php') !== false) {echo 'active';} ?>" >
							<a class="nav-link" href="tours.php">Tours</a>
						</li>
						<li class="nav-item <?php if (stripos($_SERVER['REQUEST_URI'],'workshops.php') !== false) {echo 'active';} ?>" >
							<a class="nav-link" href="workshops.php">Workshops</a>
						</li>
						<li class="nav-item <?php if (stripos($_SERVER['REQUEST_URI'],'team.php') !== false) {echo 'active';} ?>" >
							<a class="nav-link" href="team.php">Team</a>
						</li>
						<li class="nav-item <?php if (stripos($_SERVER['REQUEST_URI'],'contacts.php') !== false) {echo 'active';} ?>" >
							<a class="nav-link" href="contacts.php">Contacts</a>
						</li>
					</ul><!--/#menu -->

					<form class="search form-inline mt-2 mt-md-0">
						<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
						<button class="btn btn-search btn-exotic my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
			</nav>
			
		</div><!--/#header -->

		<div id="page">
			<div class="hat"></div>