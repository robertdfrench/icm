OTHER_SOURCES=$(shell find . -name "*.latex" -not -name "icm.latex" -type f)

icm.pdf: icm.latex $(OTHER_SOURCES)
	pdflatex icm.latex
