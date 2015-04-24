<?php

$dir = dirname( dirname( __FILE__ ) );

$config = array(
	'root_path'  => $dir,
	'src_path'   => $dir . '/src',
	'asset_path' => $dir . '/assets',
	'app_env'    => 'development',
);

echo json_encode( $config, true );
die;
