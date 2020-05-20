OTHER_SOURCES=$(shell find . -name "*.latex" -not -name "icm.latex" -type f)

test:
	node concepts.js

icm.pdf: icm.latex $(OTHER_SOURCES)
	pdflatex $<
	open $@
