
build:
	@spm build

deploy:
	@rm -rf ../../sea-modules/bunny/overlay
	@mkdir  ../../sea-modules/bunny/overlay
	@mkdir  ../../sea-modules/bunny/overlay/1.0.0
	@cp     dist/*.* ../../sea-modules/bunny/overlay/1.0.0
	@rm -rf dist
	@echo
	@echo   " deploy to sea-modules/bunny/overlay/1.0.0"
	@echo
