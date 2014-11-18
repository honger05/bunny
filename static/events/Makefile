
build:
	@spm build

deploy:
	@rm -rf ../../sea-modules/bunny/events
	@mkdir  ../../sea-modules/bunny/events
	@mkdir  ../../sea-modules/bunny/events/1.0.0
	@cp     dist/*.* ../../sea-modules/bunny/events/1.0.0
	@rm -rf dist
	@echo
	@echo   " deploy to sea-modules/bunny/events/1.0.0"
	@echo
