#!/bin/bash

# React + TypeScript + Vite 项目依赖项全面更新脚本
# 使用方法: ./update-dependencies.sh [batch]
# batch参数: 1-4 (指定要更新的批次)，不指定则执行所有批次

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查环境
check_environment() {
    log_info "检查环境..."
    
    # 检查Node.js版本
    NODE_VERSION=$(node --version)
    log_info "Node.js版本: $NODE_VERSION"
    
    # 检查pnpm版本
    PNPM_VERSION=$(pnpm --version)
    log_info "pnpm版本: $PNPM_VERSION"
    
    # 检查当前分支
    CURRENT_BRANCH=$(git branch --show-current)
    log_info "当前分支: $CURRENT_BRANCH"
    
    if [[ "$CURRENT_BRANCH" == "master" || "$CURRENT_BRANCH" == "main" ]]; then
        log_warning "您正在主分支上，建议创建新分支进行更新"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "退出更新过程"
            exit 0
        fi
    fi
    
    # 检查是否有未提交的更改
    if ! git diff --quiet || ! git diff --cached --quiet; then
        log_error "存在未提交的更改，请先提交或暂存"
        exit 1
    fi
    
    log_success "环境检查完成"
}

# 创建备份
create_backup() {
    log_info "创建备份..."
    
    BACKUP_TAG="pre-update-$(date +%Y%m%d-%H%M%S)"
    git add .
    git commit -m "chore: save current state before dependency update" || log_warning "没有需要提交的更改"
    git tag -a "$BACKUP_TAG" -m "State before dependency update"
    
    log_success "备份已创建，标签: $BACKUP_TAG"
    echo "$BACKUP_TAG" > .backup-tag
}

# 检查依赖项状态
check_dependencies() {
    log_info "检查依赖项状态..."
    
    # 生成过期依赖报告
    pnpm outdated --format=table > outdated-report.txt
    log_info "过期依赖报告已生成: outdated-report.txt"
    
    # 运行安全审计
    log_info "运行安全审计..."
    pnpm audit || log_warning "发现安全漏洞，将在更新过程中处理"
    
    log_success "依赖项状态检查完成"
}

# 更新第一批：核心依赖项
update_batch_1() {
    log_info "更新第一批：核心依赖项..."
    
    log_info "更新TypeScript..."
    pnpm update typescript@latest
    
    log_info "更新Vite及其插件..."
    pnpm update vite@latest @vitejs/plugin-react@latest @vitejs/plugin-react-swc@latest
    
    log_info "更新构建工具..."
    pnpm update @swc/core@latest
    
    log_info "更新React生态系统..."
    pnpm update react@latest react-dom@latest @types/react@latest @types/react-dom@latest
    
    log_success "第一批依赖项更新完成"
}

# 更新第二批：UI框架与样式
update_batch_2() {
    log_info "更新第二批：UI框架与样式..."
    
    log_info "更新Tailwind CSS生态系统..."
    pnpm update tailwindcss@latest postcss@latest autoprefixer@latest
    
    log_info "更新DaisyUI..."
    pnpm update daisyui@latest
    
    log_info "更新SCSS..."
    pnpm update sass@latest
    
    log_success "第二批依赖项更新完成"
}

# 更新第三批：开发工具
update_batch_3() {
    log_info "更新第三批：开发工具..."
    
    log_info "更新Prettier..."
    pnpm update prettier@latest eslint-plugin-prettier@latest eslint-config-prettier@latest
    
    log_info "更新ESLint及其插件..."
    pnpm update eslint@latest eslint-plugin-react@latest eslint-plugin-react-hooks@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb-typescript@latest
    
    log_info "更新Husky和commitlint..."
    pnpm update husky@latest @commitlint/cli@latest @commitlint/config-conventional@latest
    
    log_info "更新其他开发工具..."
    pnpm update lint-staged@latest
    
    log_success "第三批依赖项更新完成"
}

# 更新第四批：其他依赖
update_batch_4() {
    log_info "更新第四批：其他依赖..."
    
    log_info "更新剩余依赖..."
    pnpm update @icon-park/react@latest axios@latest react-router-dom@latest react-markdown@latest remark-gfm@latest
    
    log_info "更新测试相关..."
    pnpm update vitest@latest @vitest/ui@latest @testing-library/react@latest @testing-library/jest-dom@latest jsdom@latest
    
    log_success "第四批依赖项更新完成"
}

# 验证更新
verify_update() {
    log_info "验证更新..."
    
    # 检查依赖项是否正确安装
    log_info "检查依赖项列表..."
    pnpm list --depth=0
    
    # 运行类型检查
    if [ -f "package.json" ] && grep -q "type-check" package.json; then
        log_info "运行类型检查..."
        pnpm type-check
    fi
    
    # 运行代码风格检查
    log_info "运行代码风格检查..."
    pnpm lint
    pnpm lint:fix
    
    # 运行测试
    if [ -f "package.json" ] && grep -q "test" package.json; then
        log_info "运行测试..."
        pnpm test
    fi
    
    # 尝试构建项目
    log_info "尝试构建项目..."
    pnpm build
    
    log_success "验证完成"
}

# 运行安全审计
run_security_audit() {
    log_info "运行安全审计..."
    
    # 运行审计
    pnpm audit
    
    # 尝试自动修复
    log_info "尝试自动修复安全问题..."
    pnpm audit fix || log_warning "无法自动修复所有安全问题"
    
    # 再次运行审计
    log_info "再次运行安全审计..."
    pnpm audit
    
    log_success "安全审计完成"
}

# 提交更改
commit_changes() {
    log_info "提交更改..."
    
    # 添加更改
    git add package.json pnpm-lock.yaml
    
    # 提交
    git commit -m "chore(deps): update dependencies to latest versions"
    
    log_success "更改已提交"
}

# 主函数
main() {
    local batch=${1:-all}
    
    log_info "开始依赖项更新过程..."
    
    # 环境检查
    check_environment
    
    # 创建备份
    create_backup
    
    # 检查依赖项状态
    check_dependencies
    
    # 根据参数执行更新
    case $batch in
        1)
            update_batch_1
            ;;
        2)
            update_batch_2
            ;;
        3)
            update_batch_3
            ;;
        4)
            update_batch_4
            ;;
        all)
            update_batch_1
            verify_update
            update_batch_2
            verify_update
            update_batch_3
            verify_update
            update_batch_4
            ;;
        *)
            log_error "无效的批次参数: $batch"
            log_info "使用方法: $0 [1-4|all]"
            exit 1
            ;;
    esac
    
    # 验证更新
    verify_update
    
    # 运行安全审计
    run_security_audit
    
    # 提交更改
    commit_changes
    
    log_success "依赖项更新完成！"
    log_info "备份标签: $(cat .backup-tag)"
    log_warning "请手动测试应用功能，确保一切正常后再合并到主分支"
}

# 执行主函数
main "$@"
