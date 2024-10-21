# Makefile

# Define the Go source file and the output directory
SRC = main.go
OUT_DIR = ./bin
VENDOR_DIR = ./vendor
WASM_OUT = $(OUT_DIR)/main.wasm
WASM_EXEC_SRC = $(GOROOT)/misc/wasm/wasm_exec.js
WASM_EXEC_DEST = $(VENDOR_DIR)/wasm_exec.js

# Default target
all: wasm copy_wasm_exec
	@echo "All build complete"

# WASM target
wasm:
	@mkdir -p $(OUT_DIR)
	GOOS=js GOARCH=wasm go build -o $(WASM_OUT) $(SRC)
	@echo "WASM build complete: $(WASM_OUT)"

copy_wasm_exec:
	@mkdir -p $(VENDOR_DIR)
	@cp $(WASM_EXEC_SRC) $(WASM_EXEC_DEST)
	@echo "Copied wasm_exec.js to $(OUT_DIR)"

deploy: wasm copy_wasm_exec
	@npx wrangler deploy
	@echo "Deployed to Cloudflare Worker"

# Clean target
clean:
	@rm -rf $(OUT_DIR)
	@rm -rf $(VENODR_DIR)
	@echo "Clean complete"

# Phony targets
.PHONY: all wasm copy_wasm_exec clean deploy