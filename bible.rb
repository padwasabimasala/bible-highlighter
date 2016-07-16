#!/usr/bin/env ruby 
# deps: minitest guard
# Usage: $0 --test

require 'json'

class Bible
	def self.read_json(filename)
		file = File.read filename
		JSON.parse file
	end

	def initialize(filename)
		file = File.read filename
		@bible = JSON.parse file
	end
end

if ARGV[0] == '--test'
  ARGV.pop
  require 'minitest/autorun'

	class TestBible < Minitest::Test
		def setup
			@json = %q(
        {"Genesis": {
            "001:001": "In the beginning God created the heavens and the earth.",
            "001:002": "Now the earth was formless and empty, darkness was over  the surface of the deep, and the Spirit of God was hovering  over the waters.",
            "001:003": "And God said, \"Let there be light,\" and there was light."},
          "Exodus": {
            "001:001": "These are the names of the sons of Israel who went to Egypt  with Jacob, each with his family:",
            "001:002": "Reuben, Simeon, Levi and Judah;",
            "001:003": "Issachar, Zebulun and Benjamin;"}
        }
			})

			@filename = 'bible.json'
			@bible = ::Bible.new @filename
		end

		def test_it_works
			assert @bible
		end

		def test_read_json
			convert = Bible.read_json @filename
			assert convert
			assert convert["Genesis"]
		end
	end
end
