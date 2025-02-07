#!/usr/bin/env perl
use strict;
use warnings;
use JSON;

print "Content-type: application/json\n\n";

# Sample data
my @posts = (
    {
        title       => "First Post",
        author      => "John Doe",
        authorTitle => "Admin",
        date        => "2025-02-01",
        status      => "Published",
        tags        => ["tag1", "tag2"]
    },
    {
        title       => "Second Post",
        author      => "Jane Smith",
        authorTitle => "Editor",
        date        => "2025-02-02",
        status      => "Draft",
        tags        => ["tag3"]
    }
);

print to_json(\@posts);
