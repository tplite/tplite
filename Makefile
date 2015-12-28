MAIN=tpl
STRINGBUFFER=stringbuffer
TARGET=tplite

compile: merge yui
	java -jar yuicompressor.jar $(MAIN).js -o $(MAIN).min.js
	java -jar yuicompressor.jar $(STRINGBUFFER).js -o $(STRINGBUFFER).min.js
	java -jar yuicompressor.jar $(TARGET).js -o $(TARGET).min.js

merge:
	head --line=-2 $(MAIN).js > $(TARGET).js
	tail --line=8 $(STRINGBUFFER).js >> $(TARGET).js

yui:
	test -s ./yuicompressor.jar || wget https://github.com/yui/yuicompressor/releases/download/v2.4.8/yuicompressor-2.4.8.jar -O yuicompressor.jar
	    
