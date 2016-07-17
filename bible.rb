#!/usr/bin/env ruby 
# deps: minitest guard
# Usage: $0 --test

require 'json'
require 'rexml/document'

class Bible

	def method_missing(method, *args, &block)
		text = @bible[method.to_s.downcase.capitalize]
		return text if text
		super
	end
		
	def self.read_json(filename)
		file = File.read filename
		JSON.parse file
	end

	def initialize(json_text)
		@bible = json_text
	end

	def fmt_html(book_name)
		text = send book_name.to_sym
		html = REXML::Document.new
		html.add_element "div", { 'data-book' => book_name }
		root = html.root
		root.add_element "div", { 'data-book' => book_name, 'data-chapter' => '001' }
		root.add_element "div", { 'data-book' => book_name, 'data-chapter' => '002' }
		html.to_s
	end

end

if ARGV[0] == '--test'
  ARGV.pop
  require 'minitest/autorun'

	class TestBible < Minitest::Test
		def setup
			@json = %q(
        {
					"Genesis": {
            "001:001": "In the beginning God created the heavens and the earth.",
            "001:002": "Now the earth was formless and empty...",
            "001:003": "And God said, \"Let there be light,\" and there was light.",
						"002:001": "Thus the heavens and the earth were completed..."
					},
          "Exodus": {
            "001:001": "These are the names of the sons of Israel who went to Egypt  with Jacob, each with his family:",
            "001:002": "Reuben, Simeon, Levi and Judah;",
            "001:003": "Issachar, Zebulun and Benjamin;"
					}
        }
			)

			@filename = 'bible.json'
			@bible = ::Bible.new JSON.parse @json.strip
			html = @bible.fmt_html "genesis"
			@xmldoc = REXML::Document.new(html)
		end

		def test_it_works
			assert @bible
		end

		def test_read_json
			convert = Bible.read_json @filename
			assert convert
			assert convert["Genesis"]
		end

		def test_has_methods_for_each_book
			assert @bible.genesis 
			assert_equal "In the beginning God created the heavens and the earth.", @bible.genesis["001:001"]
		end

		def test_fmt_html_returns_root_with_correct_book_attr
			assert_equal "genesis", @xmldoc.root.attributes["data-book"]
		end

		def test_fmt_html_returns_chapter_divs
			elms = @xmldoc.root.elements.to_a
			assert_equal "001", elms.first.attributes['data-chapter']
			assert_equal "div", elms.first.name
			assert_equal "002", elms.last.attributes['data-chapter']
			assert_equal "div", elms.last.name
		end
	end
end
