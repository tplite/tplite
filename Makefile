MAIN=tpl
COMPONENT=component
STRINGBUFFER=stringbuffer
ROUTER=router
TARGET=tplite
TARGETALL=tplite-all

compile: merge merge-with-component yui
	java -jar yuicompressor.jar lib/$(MAIN).js -o dist/$(MAIN).min.js
	java -jar yuicompressor.jar lib/$(COMPONENT).js -o dist/$(COMPONENT).min.js
	java -jar yuicompressor.jar lib/$(STRINGBUFFER).js -o dist/$(STRINGBUFFER).min.js
	java -jar yuicompressor.jar lib/$(ROUTER).js -o dist/$(ROUTER).min.js
	java -jar yuicompressor.jar lib/$(TARGET).js -o dist/$(TARGET).min.js
	java -jar yuicompressor.jar lib/$(TARGETALL).js -o dist/$(TARGETALL).min.js

merge:
	head --line=-2 lib/$(MAIN).js > lib/$(TARGET).js
	tail --line=8 lib/$(STRINGBUFFER).js >> lib/$(TARGET).js

merge-with-component:
	head --line=-2 lib/$(MAIN).js > lib/$(TARGETALL).js
	tail --line=8 lib/$(STRINGBUFFER).js | head --line=6 >> lib/$(TARGETALL).js
	tail --line=37 lib/$(ROUTER).js | head --line=35 >> lib/$(TARGETALL).js
	tail --line=91 lib/$(COMPONENT).js >> lib/$(TARGETALL).js

yui:
	test -s ./yuicompressor.jar || wget https://github.com/yui/yuicompressor/releases/download/v2.4.8/yuicompressor-2.4.8.jar -O yuicompressor.jar
	    
