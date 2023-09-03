<?php
require_once './vendor/autoload.php';

$helperLoader = new SplClassLoader('Helpers', './vendor');
$helperLoader->register();

use Helpers\Config;

$config = new Config;
$config->load('./config/config.php');

?><!DOCTYPE html>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Page — Smart Stories</title>
    <link href="https://fonts.googleapis.com/css?family=Heebo:400,500,700|Playfair+Display:700" rel="stylesheet">
	<link rel="stylesheet" href="//ositaka.com/projects/smart-stories/dist/css/style.css">
	<!-- Favicon -->
	<link rel="shortcut icon" href="//ositaka.com/projects/smart-stories/dist/images/favicon.ico">
	<link rel="icon" type="image/png" sizes="64x64" href="//ositaka.com/projects/smart-stories/dist/images/icon64.png">
	<!-- Apple/Safari icon -->
	<link rel="apple-touch-icon" sizes="180x180" href="//ositaka.com/projects/smart-stories/dist/images/icon180.png">
	<!-- Square Windows tiles -->
	<meta name="msapplication-square70x70logo" content="//ositaka.com/projects/smart-stories/dist/images/icon70.png">
	<meta name="msapplication-square150x150logo" content="//ositaka.com/projects/smart-stories/dist/images/icon150.png">
	<meta name="msapplication-square310x310logo" content="//ositaka.com/projects/smart-stories/dist/images/icon310.png">
	<!-- Rectangular Windows tile -->
	<meta name="msapplication-wide310x150logo" content="//ositaka.com/projects/smart-stories/dist/images/icon-rect-310.png">
	<!-- Windows tile theme color -->
	<meta name="msapplication-TileColor" content="#0B111E">	
    <script src="https://unpkg.com/scrollreveal@4.0.0//../dist/scrollreveal.min.js"></script>
    <style>
        ::placeholder {
          color: #7487A3;
          opacity: 1;
        }
        
        :-ms-input-placeholder {
         color: #7487A3;
        }
        
        ::-ms-input-placeholder {
         color: #7487A3;
        }
        
        Form label {
            display: none;
        }
        
        Form input,
        Form textarea {
            width: 100%;
            margin-bottom: 1px;
            padding: 30px 0;
            border: none;
            border-bottom: 2px solid #273C5A;
            transition: all 250ms ease-in-out;
            text-align: center;
            color: #7487A3;
            background: transparent;
        }
        
        Form input:focus,
        Form textarea:focus {
            outline: none;
            border-bottom: 8px solid #F9425F;
            margin-bottom: 0;
            color: white;
        }
        
        Form ::placeholder {
            font-weight: 200;
        }
        
        .help-block {
            color: #F9425F;
            font-weight: bold;
        }
        
        .alert {
            border: 8px solid #F9425F;
            padding: 20px;
            color: white;
            border-radius: 6px;
        }
        
        .alert.alert-success {
            background: #F9425F;
            padding: 20px;
            color: white;
            border-radius: 6px;
        }
    </style>
</head>
<body class="page is-boxed has-animations">
    <div class="body-wrap boxed-container">
        <header class="site-header">
            <div class="container">
                <div class="site-header-inner">
                    <div class="brand header-brand">
                        <h1 class="m-0">
                            <a href="//ositaka.com/projects/smart-stories/">
								<svg width="260" height="64" viewBox="0 0 260 64" xmlns="https://www.w3.org/2000/svg">
									<title>Smart Stories</title>
									<linearGradient id="logo" gradientUnits="userSpaceOnUse" x1="12.5311" y1="0.1513" x2="48.0093" y2="67.7165">
										<stop stop-color="#FBF9DA" offset="8%"/>
										<stop stop-color="#EC6C53" stop-opacity="1" offset="44%"/>
										<stop stop-color="#F9425F" stop-opacity=".7" offset="92%"/>
									</linearGradient>
									<path class="st1" d="M26,0C11.5,0,0,11.5,0,26c0,5.9,2.1,11.4,5.4,15.9c0.5,0.6,1,1.1,1.4,1.8l16.2,19.2l0,0
										c0.6,0.8,1.8,1.3,2.9,1.3c1.1,0,2.2-0.5,2.9-1.3l0,0l17.6-21c3.4-4.3,5.4-9.9,5.4-15.9C51.9,11.5,40.2,0,26,0z M26,13.6
										c5.4,0,9.9,4.5,9.9,9.9s-4.5,9.9-9.9,9.9S16,29,16,23.6C16,18.1,20.5,13.6,26,13.6z M36.4,44.7L36.4,44.7L36.4,44.7l-9.6,11.5l0,0
										c-0.2,0.2-0.5,0.3-0.6,0.3c-0.3,0-0.5-0.2-0.6-0.3l0,0l-9.6-11.5l0,0l0,0l0,0c-0.2-0.2-0.3-0.3-0.3-0.6c0-0.3,0.2-0.5,0.3-0.6l0,0
										c2.7-2.4,6.4-3.7,10.3-3.7c4,0,7.5,1.4,10.3,3.7c0.2,0.2,0.3,0.5,0.3,0.6C36.5,44.2,36.5,44.6,36.4,44.7L36.4,44.7z" fill="url(#logo)" />
									<g>
										<path fill="white" d="M82.5,29.4c-2.1-0.5-3.7-0.9-3.7-2.1c0-1.1,0.9-1.9,2.7-1.9c1.3,0,2.7,0.3,4,1.1c0.8,0.5,1.8,0.3,2.4-0.5v0
											c0.7-0.9,0.4-2.1-0.5-2.6C85.8,22.5,84,22,81.8,22c-4.3,0-7,2.5-7,5.5c0,4.1,3.9,4.9,6.9,5.6c2.1,0.5,3.7,1,3.7,2.3
											c0,1-1,2.1-3.2,2.1c-1.8,0-3.3-0.6-4.5-1.4c-0.8-0.5-1.9-0.3-2.4,0.5l0,0c-0.6,0.8-0.4,2,0.4,2.5c1.6,1.1,3.7,1.8,6.4,1.8
											c5,0,7.4-2.5,7.4-5.9C89.4,31,85.6,30.1,82.5,29.4z"/>
										<path fill="white" d="M108.1,27c-1.7,0-3.2,0.8-4.1,1.8c-0.2,0.3-0.6,0.2-0.8-0.1c-0.6-1.1-1.8-1.7-3.4-1.7
											c-1.4,0-2.7,0.6-3.5,1.2c-0.3,0.3-0.8,0-0.8-0.4v0c0-0.3-0.2-0.5-0.5-0.5h-2.5c-0.3,0-0.5,0.2-0.5,0.5v12.3
											c0,0.3,0.2,0.5,0.5,0.5H95c0.3,0,0.5-0.2,0.5-0.5v-8.3c0-0.1,0-0.2,0.1-0.3c0.5-0.7,1.5-1.4,2.7-1.4c1.4,0,2,0.9,2,2.1v7.9
											c0,0.3,0.2,0.5,0.5,0.5h2.5c0.3,0,0.5-0.2,0.5-0.5v-8.3c0-0.1,0-0.2,0.1-0.3c0.5-0.7,1.5-1.4,2.7-1.4c1.4,0,2,0.9,2,2.1v7.9
											c0,0.3,0.2,0.5,0.5,0.5h2.5c0.3,0,0.5-0.2,0.5-0.5V31C112,28.3,110.5,27,108.1,27z"/>
										<path fill="white" d="M121.1,27c-2,0-4,0.6-5.5,1.9c-0.2,0.1-0.2,0.3-0.1,0.5l0.9,1.6c0.1,0.2,0.4,0.3,0.6,0.1
											c1-0.8,2.2-1.3,3.5-1.3c1.8,0,2.9,0.9,2.9,2.2V33c0,0.3-0.4,0.5-0.7,0.3c-0.9-0.7-2.2-1-3.6-1c-2.1,0-4.6,1.1-4.6,4.2
											c0,3,2.5,4.4,4.6,4.4c1.4,0,2.6-0.4,3.5-1.1c0.3-0.2,0.7,0,0.7,0.3v0c0,0.2,0.2,0.4,0.4,0.4h2.7c0.2,0,0.4-0.2,0.4-0.4v-8.2
											C126.9,28.2,124.1,27,121.1,27z M123.4,37.3c0,0.1,0,0.2-0.1,0.3c-0.6,0.7-1.6,1-2.7,1c-1.4,0-2.5-0.7-2.5-2c0-1.3,1.1-2,2.5-2
											c1.1,0,2.1,0.3,2.7,1c0.1,0.1,0.1,0.2,0.1,0.3V37.3z"/>
										<path fill="white" d="M133.9,27.9L133.9,27.9c0-0.3-0.2-0.5-0.5-0.5h-2.4c-0.3,0-0.5,0.2-0.5,0.5v12.2c0,0.3,0.2,0.5,0.5,0.5h2.4
											c0.3,0,0.5-0.2,0.5-0.5V32c0-0.1,0-0.2,0.1-0.3c0.6-0.8,2.1-1.4,3.2-1.4c0.1,0,0.3,0,0.4,0c0.3,0,0.6-0.2,0.6-0.5v-2.2
											c0-0.3-0.3-0.6-0.6-0.5c-1,0.1-2,0.6-2.8,1.2C134.4,28.6,133.9,28.3,133.9,27.9z"/>
										<path fill="white" d="M145.7,37.9c-0.8,0-1.2-0.6-1.2-1.5v-4.9c0-0.6,0.5-1.1,1.1-1.1h0.5c0.6,0,1.1-0.5,1.1-1.1v-0.9
											c0-0.6-0.5-1.1-1.1-1.1h-0.5c-0.6,0-1.1-0.5-1.1-1.1v-1.4c0-0.6-0.5-1.1-1.1-1.1h-1.3c-0.6,0-1.1,0.5-1.1,1.1v1.4
											c0,0.6-0.5,1.1-1.1,1.1l0,0c-0.6,0-1.1,0.5-1.1,1.1v0.9c0,0.6,0.5,1.1,1.1,1.1l0,0c0.6,0,1.1,0.5,1.1,1.1v5.8
											c0,2.4,1.3,3.6,3.8,3.6c0.9,0,1.6-0.1,2.1-0.4c0.5-0.2,0.8-0.8,0.6-1.3l-0.2-0.7c-0.1-0.5-0.7-0.9-1.2-0.8
											C146,37.9,145.8,37.9,145.7,37.9z"/>
										<path fill="white" d="M163.7,29.4c-2.1-0.5-3.7-0.9-3.7-2.1c0-1.1,0.9-1.9,2.7-1.9c1.3,0,2.7,0.3,4,1.1c0.8,0.5,1.8,0.3,2.4-0.5
											l0,0c0.6-0.9,0.4-2.1-0.5-2.6c-1.6-0.9-3.4-1.4-5.6-1.4c-4.3,0-7,2.5-7,5.5c0,4.1,3.9,4.9,6.9,5.6c2.1,0.5,3.7,1,3.7,2.3
											c0,1-1,2.1-3.2,2.1c-1.8,0-3.3-0.6-4.5-1.4c-0.8-0.5-1.9-0.3-2.4,0.5l0,0c-0.6,0.8-0.4,2,0.4,2.5c1.6,1.1,3.7,1.8,6.4,1.8
											c5,0,7.4-2.5,7.4-5.9C170.6,31,166.8,30.1,163.7,29.4z"/>
										<path fill="white" d="M178.3,37.9c-0.8,0-1.2-0.6-1.2-1.5v-4.9c0-0.6,0.5-1.1,1.1-1.1h0.5c0.6,0,1.1-0.5,1.1-1.1v-0.9
											c0-0.6-0.5-1.1-1.1-1.1h-0.5c-0.6,0-1.1-0.5-1.1-1.1v-1.4c0-0.6-0.5-1.1-1.1-1.1h-1.3c-0.6,0-1.1,0.5-1.1,1.1v1.4
											c0,0.6-0.5,1.1-1.1,1.1h0c-0.6,0-1.1,0.5-1.1,1.1v0.9c0,0.6,0.5,1.1,1.1,1.1h0c0.6,0,1.1,0.5,1.1,1.1v5.8c0,2.4,1.3,3.6,3.8,3.6
											c0.9,0,1.6-0.1,2.1-0.4c0.5-0.2,0.8-0.8,0.6-1.3l-0.2-0.7c-0.1-0.5-0.7-0.9-1.2-0.8C178.5,37.9,178.4,37.9,178.3,37.9z"/>
										<path fill="white" d="M188.4,27c-4.4,0-7,3.2-7,7c0,3.8,2.6,7,7,7c4.4,0,7.1-3.2,7.1-7C195.4,30.2,192.8,27,188.4,27z M188.4,37.9
											c-2.2,0-3.4-1.8-3.4-3.9c0-2.1,1.2-3.9,3.4-3.9s3.4,1.8,3.4,3.9C191.8,36.1,190.5,37.9,188.4,37.9z"/>
										<path fill="white" d="M201.5,27.9L201.5,27.9c0-0.3-0.2-0.5-0.5-0.5h-2.4c-0.3,0-0.5,0.2-0.5,0.5v12.2c0,0.3,0.2,0.5,0.5,0.5h2.4
											c0.3,0,0.5-0.2,0.5-0.5V32c0-0.1,0-0.2,0.1-0.3c0.6-0.8,2.1-1.4,3.2-1.4c0.1,0,0.3,0,0.4,0c0.3,0,0.6-0.2,0.6-0.5v-2.2
											c0-0.3-0.3-0.6-0.6-0.5c-1,0.1-2,0.6-2.8,1.2C202,28.6,201.5,28.3,201.5,27.9z"/>
										<path fill="white" d="M209.7,40.6L209.7,40.6c1,0,1.7-0.8,1.7-1.7v-9.8c0-1-0.8-1.7-1.7-1.7h0c-1,0-1.7,0.8-1.7,1.7v9.8
											C207.9,39.9,208.7,40.6,209.7,40.6z"/>
										<path fill="white" d="M210.3,21.3c-1.4-0.4-2.7,0.6-2.7,2c0,1.2,1,2.1,2.1,2.1c1.3,0,2.3-1.1,2.1-2.4
											C211.6,22.2,211,21.5,210.3,21.3z"/>
										<path fill="white" d="M220.9,27c-4,0-6.9,3.1-6.9,7c0,4.3,3.1,7,7.1,7c1.8,0,3.6-0.5,4.9-1.4c0.3-0.2,0.4-0.7,0.2-1.1l-0.7-1
											c-0.2-0.3-0.7-0.4-1-0.2c-0.8,0.5-2,0.9-3,0.9c-1.7,0-2.9-0.8-3.5-2c-0.3-0.5,0.1-1.1,0.7-1.1h8.1c0.4,0,0.8-0.3,0.8-0.8l0,0
											C227.6,30,224.9,27,220.9,27z M218.7,32.7c-0.6,0-0.9-0.6-0.7-1.1c0.5-1,1.4-1.8,3-1.8c1.7,0,2.6,0.9,3,1.9
											c0.2,0.5-0.2,1.1-0.7,1.1H218.7z"/>
										<path fill="white" d="M235.3,32.4c-1.5-0.3-2.5-0.6-2.5-1.4c0-0.8,0.8-1.2,2.1-1.2c1.1,0,2.1,0.3,2.9,0.7c0.7,0.4,1.5,0.2,1.8-0.5
											v0c0.4-0.7,0.1-1.5-0.5-1.9c-1.1-0.6-2.5-1-4.2-1c-3.5,0-5.5,2-5.5,4.2c0,3.2,2.9,3.7,5.2,4.2c1.5,0.3,2.7,0.6,2.7,1.6
											c0,0.8-0.7,1.3-2.2,1.3c-1.2,0-2.5-0.5-3.5-1c-0.6-0.4-1.4-0.2-1.8,0.5l-0.1,0.2c-0.4,0.6-0.2,1.5,0.5,1.9
											c1.3,0.8,3.1,1.2,4.8,1.2c3.7,0,5.8-1.8,5.8-4.3C240.7,33.4,237.6,32.8,235.3,32.4z"/>
									</g>
								</svg>
                            </a>
                        </h1>
                    </div>
                    <nav role="Main Navigation">
                        <ul>
                            <li><a href="//ositaka.com/projects/smart-stories/app">App</a></li>
                            <li><a href="//ositaka.com/projects/smart-stories/concept">Concept</a></li>
                            <li><a href="//ositaka.com/projects/smart-stories/how">How</a></li>
                            <li><a href="//ositaka.com/projects/smart-stories/about">About</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        <main>
            <section class="hero text-center text-light">
                <div class="container-sm">
                    <div class="hero-inner">
						<div class="hero-copy">
						    <center>
    	                        <h1 class="hero-title mt-0">Contact us</h1>
    	                        <p class="hero-paragraph">You can use the contact form bellow to send a message with your questions and ideas or future partnerships or send us an email directly to <a href="mailto:info@smartstories.online">info@smartstories.online</a>.</p>
							</center>
						</div>
                    </div>
                   <form enctype="application/x-www-form-urlencoded;" id="contact-form" class="form-horizontal text-center mt-40" role="form" method="post">
                        <div class="form-group" id="name-field">
                            <label for="form-name" class="control-label"><?php echo $config->get('fields.name'); ?></label>
                            <input type="text" class="form-control" id="form-name" name="form-name" placeholder="<?php echo $config->get('fields.name'); ?>" required>
                        </div>
                        <div class="form-group" id="email-field">
                            <label for="form-email" class="control-label"><?php echo $config->get('fields.email'); ?></label>
                            <input type="email" class="form-control" id="form-email" name="form-email" placeholder="<?php echo $config->get('fields.email'); ?>" required>
                        </div>
                        <div class="form-group" id="subject-field">
                            <label for="form-subject" class="col-lg-2 control-label"><?php echo $config->get('fields.subject'); ?></label>
                            <input type="text" class="form-control" id="form-subject" name="form-subject" placeholder="<?php echo $config->get('fields.subject'); ?>" required>
                        </div>
                        <div class="form-group" id="message-field">
                            <label for="form-message" class="col-lg-2 control-label"><?php echo $config->get('fields.message'); ?></label>
                            <textarea class="form-control text-sm" rows="6" id="form-message" name="form-message" placeholder="<?php echo $config->get('fields.message'); ?>" required></textarea>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="button button-primary button-shadow mt-16">Send message</button>
                        </div>
                    </form>

                </div>
            </section>
            
            <section class="contact-form section">
                <div class="container-sm">
                    <div class="section-inner text-center">
                    </div>
                </div>
            </section>

            <section class="indiegogo section">
                <a href="https://www.indiegogo.com/project/preview/ff12ddc6" title="Indiegogo Campaign" target="_blank">
                    <div class="container-sm">
                        <div class="media-inner section-inner">
                            <div class="media-header text-center">
                                <h2 class="section-title mt-0">Bring this concept to life</h2>
                                <p class="hero-copy mb-0">We are currently looking for fundraising and developers. Feel free to help us and join our adventure and creative community.</p>
                            </div>
                        </div>
                    </div>
                </a>
            </section>

			<section class="newsletter section" id="early-access">
                <div class="container-sm">
                    <div class="newsletter-inner section-inner">
                        <div class="newsletter-header text-center">
                            <h2 class="section-title mt-0">Stay in the know</h2>
                            <p class="section-paragraph">Join us and sign up our newsletter and get emails with the latest news, new stories from our team and get early access to the App.</p>
                        </div>
                        <div id="mc_embed_signup">
                            <form action="https://ositaka.us19.list-manage.com/subscribe/post?u=1b3aafd44fd15e0da5987ce90&amp;id=2406e1d421" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                                <div class="footer-form newsletter-form field field-grouped">
                                    <div class="control control-expanded">
                                        <input class="input email" value="" type="email" name="EMAIL" id="mce-EMAIL" placeholder="Your best email&hellip;" required>
                                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1b3aafd44fd15e0da5987ce90_2406e1d421" tabindex="-1" value=""></div>
                                    </div>
                                    <div class="control">
                                        <input type="submit" value="Early Access" name="subscribe" id="mc-embedded-subscribe" class="button button-primary button-block button-shadow">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="container">
                <div class="site-footer-inner has-top-divider">
                    <div class="brand footer-brand">
                        <a href="//ositaka.com/projects/smart-stories/">
							<svg width="32" height="32" viewBox="0 0 32 32" xmlns="https://www.w3.org/2000/svg">
								<title>Smart Stories</title>
								<linearGradient id="logo-small" gradientUnits="userSpaceOnUse" x1="6.2655" y1="7.565793e-02" x2="24.0047" y2="33.8583">
									<stop stop-color="#556B8B" offset="8%"/>
									<stop stop-color="#556B8B" stop-opacity=".7" offset="44%"/>
									<stop stop-color="#556B8B" stop-opacity=".4" offset="92%"/>
								</linearGradient>
								<path d="M22.8,4c-2.6-2.6-5.9-4-9.6-4s-7,1.4-9.6,4C1.3,6.6,0,9.9,0,13.6s1.3,7,3.8,9.6l8.3,8.3l0.1,0.1
									c0.7,0.7,1.8,0.7,2.4-0.1l8.3-8.3c2.6-2.6,4-5.9,4-9.6S25.4,6.6,22.8,4z M13.4,7.3c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6
									s-5.6-2.5-5.6-5.6C7.8,9.8,10.3,7.3,13.4,7.3z M18.9,23.8L13.7,29c-0.2,0.2-0.5,0.2-0.7,0l-5.2-5.2c-0.2-0.2-0.2-0.6,0.1-0.8
									c1.6-0.9,3.4-1.5,5.4-1.5c2,0,3.8,0.5,5.4,1.5C19.1,23.2,19.1,23.6,18.9,23.8z" fill="url(#logo-small)"/>
							</svg>
                        </a>
                    </div>
                    <ul class="footer-links list-reset">
                        <li>
                            <a href="//ositaka.com/projects/smart-stories/downloads/">Downloads</a>
                        </li>
                        <li>
                            <a href="//ositaka.com/projects/smart-stories/press-kit/">Press Kit</a>
                        </li>
                        <li>
                            <a href="//ositaka.com/projects/smart-stories/contact/">Contact us</a>
                        </li>
                    </ul>
                    <ul class="footer-social-links list-reset">
                        <li>
                            <a href="https://www.facebook.com/groups/468658473703140/" title="Join the Facebook Group" target="_blank">
                                <span class="screen-reader-text">Facebook</span>
                                <svg width="16" height="16" xmlns="https://www.w3.org/2000/svg">
                                    <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/stories_smart" title="Follow on Twitter" target="_blank">
                                <span class="screen-reader-text">Twitter</span>
                                <svg width="16" height="16" xmlns="https://www.w3.org/2000/svg">
                                    <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://smartstories.slack.com/" title="Chat on Slack" target="_blank">
                                <span class="screen-reader-text">Slack</span>
                                <svg width="16" height="16" xmlns="https://www.w3.org/2000/svg">
                                    <path d="M0 10.1c0 .9.8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7V8.4H1.7c-.9 0-1.7.8-1.7 1.7zM5.9 8.4c-.9 0-1.7.8-1.7 1.7v4.2c0 .9.8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7v-4.2c0-.9-.8-1.7-1.7-1.7zM5.9 0C5 0 4.2.8 4.2 1.7c0 .9.8 1.7 1.7 1.7h1.7V1.7C7.6.8 6.8 0 5.9 0zM5.9 4.2H1.7C.8 4.2 0 5 0 5.9c0 .9.8 1.7 1.7 1.7h4.2c.9 0 1.7-.8 1.7-1.7 0-.9-.8-1.7-1.7-1.7zM16 5.9c0-.9-.8-1.7-1.7-1.7-.9 0-1.7.8-1.7 1.7v1.7h1.7c.9 0 1.7-.8 1.7-1.7zM10.1 7.6c.9 0 1.7-.8 1.7-1.7V1.7C11.8.8 11 0 10.1 0c-.9 0-1.7.8-1.7 1.7v4.2c0 .9.8 1.7 1.7 1.7zM10.1 12.6H8.4v1.7c0 .9.8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7s-.8-1.7-1.7-1.7zM14.3 8.4h-4.2c-.9 0-1.7.8-1.7 1.7 0 .9.8 1.7 1.7 1.7h4.2c.9 0 1.7-.8 1.7-1.7 0-.9-.8-1.7-1.7-1.7z"  fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div class="footer-copyright">&copy; 2019 Smart Stories, all rights reserved</div>
                </div>
            </div>
        </footer>
    </div>

    <script src="//ositaka.com/projects/smart-stories/dist/js/main.min.js"></script>
    <script src="/contact/public/js/contact-form.js"></script>
    <script type="text/javascript">
      new ContactForm('#contact-form', {
          endpoint: './process.php'
      });
    </script>
    <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-142487053-1', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview');
    </script>
    <script src="https://www.google-analytics.com/analytics.js" async defer></script>
</body>
</html>