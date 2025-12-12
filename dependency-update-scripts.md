# 依赖项更新脚本与风险评估

## 自动化更新脚本

以下是一个完整的Bash脚本，可以自动化依赖项更新过程。请将此脚本保存为`update-dependencies.sh`并设置执行权限：

```bash
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
    
    log_info "更新React生态系统..."
    pnpm update react@latest react-dom@latest @types/react@latest @types/react-dom@latest
    
    log_info "更新TypeScript..."
    pnpm update typescript@latest
    
    log_info "更新Vite及其插件..."
    pnpm update vite@latest @vitejs/plugin-react@latest @vitejs/plugin-react-swc@latest
    
    log_info "更新构建工具..."
    pnpm update swc-loader@latest @swc/core@latest
    
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
    
    log_info "更新ESLint及其插件..."
    pnpm update eslint@latest eslint-plugin-react@latest eslint-plugin-react-hooks@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb@latest eslint-config-airbnb-typescript@latest
    
    log_info "更新Prettier..."
    pnpm update prettier@latest eslint-plugin-prettier@latest eslint-config-prettier@latest
    
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
```

### 使用方法

1. 将上述脚本保存为`update-dependencies.sh`
2. 设置执行权限：`chmod +x update-dependencies.sh`
3. 运行脚本：
   - 更新所有批次：`./update-dependencies.sh`
   - 只更新第一批：`./update-dependencies.sh 1`
   - 只更新第二批：`./update-dependencies.sh 2`
   - 以此类推...

## 依赖项风险评估表

| 依赖项 | 当前版本 | 最新版本 | 风险等级 | 潜在破坏性变更 | 审查要点 |
|--------|----------|----------|----------|----------------|----------|
| **核心依赖** | | | | | |
| react | 18.2.0 | 18.x.x/19.x.x | 高 | React 19可能有重大API变更 | 检查废弃的API和新的并发特性 |
| react-dom | 18.2.0 | 18.x.x/19.x.x | 高 | 同React | 确保与React版本匹配 |
| typescript | 5.0.2 | 5.x.x | 中 | 类型系统可能有细微变化 | 检查严格类型检查是否有新错误 |
| vite | 4.4.5 | 5.x.x | 高 | Vite 5有配置变更 | 检查配置文件和插件兼容性 |
| **UI框架与样式** | | | | | |
| tailwindcss | 3.3.3 | 3.x.x | 低 | 通常向后兼容 | 检查自定义CSS是否有冲突 |
| daisyui | 3.9.4 | 4.x.x | 中 | 可能有组件变更 | 检查自定义主题和组件使用 |
| sass | 1.69.0 | 1.x.x | 低 | 通常向后兼容 | 检查SCSS语法是否有新限制 |
| **开发工具** | | | | | |
| eslint | 8.50.0 | 9.x.x | 中 | ESLint 9有重大配置变更 | 可能需要重写配置文件 |
| prettier | 3.0.3 | 3.x.x | 低 | 通常向后兼容 | 检查格式化是否有细微变化 |
| husky | 8.0.3 | 9.x.x | 中 | 配置方式可能有变化 | 检查Git钩子是否正常工作 |
| **其他依赖** | | | | | |
| axios | 1.5.1 | 1.x.x | 低 | 通常向后兼容 | 检查拦截器和请求处理 |
| react-router-dom | 6.17.0 | 6.x.x | 中 | 可能有路由API变更 | 检查导航和路由配置 |

## 高风险依赖项详细审查

### React 18 → 19 潜在问题

1. **并发特性**：React 19可能引入新的并发API，需要检查现有代码是否兼容
2. **服务器组件**：如果引入服务器组件，需要检查项目结构
3. **类型定义**：@types/react可能有重大变更，需要检查类型错误

### Vite 4 → 5 潜在问题

1. **配置文件**：vite.config.ts可能需要调整
2. **插件兼容性**：某些Vite插件可能不兼容Vite 5
3. **构建输出**：构建产物可能有细微差异

### ESLint 8 → 9 潜在问题

1. **配置格式**：可能需要从.eslintrc.js/.cjs转换为eslint.config.js
2. **插件系统**：插件系统可能有重大变更
3. **规则变更**：某些默认规则可能发生变化

## 回滚脚本

如果更新后出现问题，可以使用以下脚本快速回滚：

```bash
#!/bin/bash

# 回滚到更新前的状态
set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# 检查备份标签
if [ ! -f ".backup-tag" ]; then
    log_error "未找到备份标签文件"
    exit 1
fi

BACKUP_TAG=$(cat .backup-tag)
log_info "回滚到备份标签: $BACKUP_TAG"

# 确认回滚
read -p "确定要回滚到 $BACKUP_TAG 吗? 这将丢失所有未提交的更改 (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "取消回滚"
    exit 0
fi

# 执行回滚
log_info "执行回滚..."
git checkout $BACKUP_TAG

# 重新安装依赖
log_info "重新安装依赖..."
pnpm install --frozen-lockfile

# 重新构建
log_info "重新构建..."
pnpm build

log_success "回滚完成！"
log_warning "请创建新分支继续开发，不要直接在回滚的提交上工作"
```

## CI/CD集成建议

### GitHub Actions工作流更新

在`.github/workflows/deploy.yml`中添加以下步骤：

```yaml
- name: Check for outdated dependencies
  run: |
    npm i pnpm -g
    pnpm outdated
    pnpm audit

- name: Run security audit
  run: pnpm audit --audit-level moderate

- name: Notify on dependency updates
  if: failure()
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: 'Dependency update failed',
        body: 'Dependency update process failed. Please check the logs and investigate.',
        labels: ['dependencies', 'urgent']
      })
```

### 定期自动化更新

创建`.github/dependabot.yml`文件：

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "your-username"
    assignees:
      - "your-username"
    commit-message:
      prefix: "chore"
      include: "scope"
```

## 测试清单

### 单元测试
- [ ] 所有单元测试通过
- [ ] 测试覆盖率没有显著下降
- [ ] 没有新的测试失败

### 集成测试
- [ ] API集成测试正常
- [ ] 组件间交互正常
- [ ] 路由导航正常

### 端到端测试
- [ ] 用户注册/登录流程
- [ ] 主要功能流程（如博客文章浏览）
- [ ] 表单提交和验证

### 手动测试
- [ ] 应用在不同浏览器中正常工作
- [ ] 响应式布局在不同设备上正常
- [ ] 深色/浅色主题切换正常
- [ ] 性能没有明显下降

## 常见问题解决

### 依赖冲突

如果遇到依赖冲突，可以尝试：

1. 清除缓存：`pnpm store prune`
2. 删除node_modules和lockfile：`rm -rf node_modules pnpm-lock.yaml`
3. 重新安装：`pnpm install`

### 类型错误

TypeScript更新后可能出现类型错误：

1. 检查@types/包是否需要更新
2. 查看是否有API变更
3. 临时使用`// @ts-ignore`或`// @ts-nocheck`（不推荐长期使用）

### 构建错误

构建过程可能失败：

1. 检查Vite配置是否需要更新
2. 查看是否有插件不兼容
3. 检查是否有语法错误或废弃的API使用

---

**注意事项**：
1. 在生产环境应用更新前，务必在预发环境进行全面测试
2. 保留所有更新过程中的日志和错误信息，以便问题排查
3. 考虑使用功能标志逐步推出重大变更，以降低风险
4. 更新过程中如遇到问题，及时与团队沟通并寻求支持