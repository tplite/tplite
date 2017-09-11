MAIN=tpl
COMPONENT=component
STRINGBUFFER=stringbuffer
TARGET=tplite
TARGETALL=tplite-all

compile: merge merge-with-component yui
	java -jar yuicompressor.jar $(MAIN).js -o $(MAIN).min.js
	java -jar yuicompressor.jar $(COMPONENT).js -o $(COMPONENT).min.js
	java -jar yuicompressor.jar $(STRINGBUFFER).js -o $(STRINGBUFFER).min.js
	java -jar yuicompressor.jar $(TARGET).js -o $(TARGET).min.js
	java -jar yuicompressor.jar $(TARGETALL).js -o $(TARGETALL).min.js

merge:
	head --line=-2 $(MAIN).js > $(TARGET).js
	tail --line=8 $(STRINGBUFFER).js >> $(TARGET).js

merge-with-component:
	head --line=-2 $(MAIN).js > $(TARGETALL).js
	tail --line=8 $(STRINGBUFFER).js | head --line=6 >> $(TARGETALL).js
	tail --line=45 $(COMPONENT).js >> $(TARGETALL).js

yui:
	test -s ./yuicompressor.jar || wget https://github.com/yui/yuicompressor/releases/download/v2.4.8/yuicompressor-2.4.8.jar -O yuicompressor.jar
	    
