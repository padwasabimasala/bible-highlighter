TESTS = test/*.js
autotest: 
	./node_modules/.bin/supervisor -w test,./ -q -n exit -x ./node_modules/.bin/mocha -- -b
test:
	./node_modules/.bin/mocha --timeout 5000 --reporter nyan $(TESTS)
nodemon:
	./node_modules/.bin/nodemon app.js
.PHONY: test
