#!/usr/bin/perl
use strict;
use warnings;
use CGI qw(:standard);
use JSON;
use File::Basename;

# Enable CORS
print header(-type => 'application/json', -access_control_allow_origin => '*');

# Read the input
my $q = CGI->new;
my $title = $q->param('title');
my $content = $q->param('content');
my $author = $q->param('author');
my $authorTitle = $q->param('authorTitle');
my $date = $q->param('date');
my $status = $q->param('status');
my $tags = $q->param('tags');
my $image = $q->upload('image');

# Validate input
if (!$title || !$content || !$author || !$date || !$status) {
    print to_json({ error => "Missing required fields" });
    exit;
}

# Handle image upload
my $image_path = '';
if ($image) {
    my $upload_dir = 'uploads/';
    my $filename = basename($image);
    $image_path = $upload_dir . $filename;

    open my $out, '>', $image_path or die "Could not open file '$image_path' $!";
    binmode $out;
    while (my $bytesread = read($image, my $buffer, 1024)) {
        print $out $buffer;
    }
    close $out;
}

# Ensure posts.json file exists
my $posts_file = 'posts.json';
if (!-e $posts_file) {
    open my $fh, '>', $posts_file or die "Could not create file '$posts_file' $!";
    close $fh;
}

# Save the post
open my $fh, '>>', $posts_file or die "Could not open file '$posts_file' $!";
print $fh to_json({
    title => $title,
    content => $content,
    author => $author,
    authorTitle => $authorTitle,
    date => $date,
    status => $status,
    tags => [ split /,/, $tags ],
    image => $image_path
}) . "\n";
close $fh;

print to_json({ success => "Post saved successfully" });
