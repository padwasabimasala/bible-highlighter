#!/usr/bin/env ruby
# Converts a ref formatted Bible text into json written to stdout
# Usage parse.rb <inputfile>
# Example parse.rb NIV > niv.json

require 'json'

class Book
  def initialize name
    @name = name
    @verses = {}
  end

  def start_verse line
    @last_verse = line.slice(0,7)
    @verses[@last_verse] = line.slice(8,line.length).strip.to_s
  end

  def extend_verse line
    @verses[@last_verse] += "  " + line.slice(1,line.length).strip
  end

  def to_json opts
    @verses.to_json
  end
end

books = {}
text = File.open('NIV')
text.each do |line|
  case line
  when /^Book \w+ (.*)/
    $book = Book.new $1
    books[$1] = $book
  when /^[^\t]/
    $book.start_verse line
  when /^\t/
    $book.extend_verse line
  else
    STDERR.puts :err
    exit 1
  end
end

puts books.to_json
