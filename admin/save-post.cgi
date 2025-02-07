#!/usr/bin/perl
use strict;
use warnings;
use CGI qw(:standard);
use JSON;

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

# Save the post (example, replace with actual saving logic)
my $posts_file = 'posts.json';
open my $fh, '>>', $posts_file or die "Could not open file '$posts_file' $!";
print $fh to_json({
    title => $title,
    content => $content,
    author => $author,
    authorTitle => $authorTitle,
    date => $date,
    status => $status,
    tags => [ split /,/, $tags ],
    image => $image ? $image : ''
}) . "\n";
close $fh;

print to_json({ success => "Post saved successfully" });
