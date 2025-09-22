<template>
  <div class="ud-components-test">
    <h2>Ud 組件綜合測試頁面</h2>
    
    <!-- UdButton 測試 -->
    <section class="test-section">
      <h3>UdButton 測試</h3>
      
      <!-- 基本按鈕測試 -->
      <div class="button-subsection">
        <h4>基本按鈕</h4>
        <div class="button-group">
          <ud-button @click="handleButtonClick('基本按鈕')">基本按鈕</ud-button>
          <ud-button @click="handleButtonClick('預設文字')">預設文字</ud-button>
        </div>
      </div>

      <!-- 樣式變體測試 -->
      <div class="button-subsection">
        <h4>樣式變體</h4>
        <div class="button-group">
          <ud-button @click="handleButtonClick('普通按鈕')">普通按鈕</ud-button>
          <ud-button @click="handleButtonClick('線條按鈕')" plain>線條按鈕</ud-button>
          <ud-button @click="handleButtonClick('圓角按鈕')" round>圓角按鈕</ud-button>
          <ud-button @click="handleButtonClick('圓形按鈕')" circle>圓形按鈕</ud-button>
        </div>
      </div>

      <!-- 狀態測試 -->
      <div class="button-subsection">
        <h4>狀態測試</h4>
        <div class="button-group">
          <ud-button @click="handleButtonClick('正常按鈕')">正常按鈕</ud-button>
          <ud-button @click="handleButtonClick('禁用按鈕')" disabled>禁用按鈕</ud-button>
          <ud-button @click="toggleButtonLoading" :loading="buttonLoading">
            {{ buttonLoading ? '載入中...' : '載入按鈕' }}
          </ud-button>
        </div>
      </div>

      <!-- 圖標測試 -->
      <div class="button-subsection">
        <h4>圖標測試</h4>
        <div class="button-group">
          <ud-button @click="handleButtonClick('CSS圖標')" icon="fas fa-star">CSS圖標</ud-button>
          <ud-button @click="handleButtonClick('圖片圖標')" image="/src/assets/images/icon/search.png">圖片圖標</ud-button>
          <ud-button @click="toggleButtonLoading2" :loading="buttonLoading2">
            載入圖標
          </ud-button>
        </div>
      </div>

      <!-- 節流/防抖測試 -->
      <div class="button-subsection">
        <h4>節流/防抖測試</h4>
        <div class="button-group">
          <ud-button @click="handleThrottleClick" throttle :delay="2000">
            節流按鈕 (2秒)
          </ud-button>
          <ud-button @click="handleDebounceClick" debounce :delay="1000">
            防抖按鈕 (1秒)
          </ud-button>
          <ud-button @click="handleNormalClick">
            普通按鈕
          </ud-button>
        </div>
        <div class="click-log">
          <h5>點擊記錄：</h5>
          <div v-for="(log, index) in buttonClickLogs" :key="index" class="log-item">
            {{ log }}
          </div>
        </div>
      </div>
    </section>

    <!-- UdInput 測試 -->
    <section class="test-section">
      <h3>UdInput 測試</h3>
      
      <!-- 基本輸入測試 -->
      <div class="input-subsection">
        <h4>基本輸入測試</h4>
        <div class="input-group">
          <div class="input-item">
            <label>基本輸入框：</label>
            <ud-input 
              v-model="basicInput" 
              placeholder="請輸入文字"
              @input="handleInputEvent('基本輸入', $event)"
              @change="handleChangeEvent('基本輸入', $event)"
              @enter="handleEnterEvent('基本輸入', $event)"
            />
            <div class="input-value">值：{{ basicInput }}</div>
          </div>
          
          <div class="input-item">
            <label>置中輸入框：</label>
            <ud-input 
              v-model="centerInput" 
              placeholder="置中文字"
              center
              @input="handleInputEvent('置中輸入', $event)"
            />
            <div class="input-value">值：{{ centerInput }}</div>
          </div>
        </div>
      </div>

      <!-- 輸入類型測試 -->
      <div class="input-subsection">
        <h4>輸入類型測試</h4>
        <div class="input-group">
          <div class="input-item">
            <label>文字輸入：</label>
            <ud-input 
              v-model="textInput" 
              type="text"
              placeholder="請輸入文字"
            />
            <div class="input-value">值：{{ textInput }}</div>
          </div>
          
          <div class="input-item">
            <label>數字輸入：</label>
            <ud-input 
              v-model="numberInput" 
              type="number"
              placeholder="請輸入數字"
              inputmode="numeric"
            />
            <div class="input-value">值：{{ numberInput }} (類型：{{ typeof numberInput }})</div>
          </div>
          
          <div class="input-item">
            <label>郵箱輸入：</label>
            <ud-input 
              v-model="emailInput" 
              type="email"
              placeholder="請輸入郵箱"
              inputmode="email"
            />
            <div class="input-value">值：{{ emailInput }}</div>
          </div>
          
          <div class="input-item">
            <label>電話輸入：</label>
            <ud-input 
              v-model="telInput" 
              type="tel"
              placeholder="請輸入電話"
              inputmode="tel"
              maxlength="10"
            />
            <div class="input-value">值：{{ telInput }}</div>
          </div>
        </div>
      </div>

      <!-- v-model 修飾子測試 -->
      <div class="input-subsection">
        <h4>v-model 修飾子測試</h4>
        <div class="input-group">
          <div class="input-item">
            <label>trim 修飾子（自動去除空格）：</label>
            <ud-input 
              v-model.trim="trimInput" 
              placeholder="輸入帶空格的文字"
            />
            <div class="input-value">值：{{ JSON.stringify(trimInput) }}</div>
          </div>
          
          <div class="input-item">
            <label>number 修飾子（自動轉數字）：</label>
            <ud-input 
              v-model.number="numberModifierInput" 
              type="text"
              placeholder="輸入數字"
            />
            <div class="input-value">值：{{ numberModifierInput }} (類型：{{ typeof numberModifierInput }})</div>
          </div>
          
          <div class="input-item">
            <label>lazy 修飾子（失焦時更新）：</label>
            <ud-input 
              v-model.lazy="lazyInput" 
              placeholder="輸入後失焦查看更新"
            />
            <div class="input-value">值：{{ lazyInput }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- UdTextarea 測試 -->
    <section class="test-section">
      <h3>UdTextarea 測試</h3>
      
      <!-- 基本輸入測試 -->
      <div class="textarea-subsection">
        <h4>基本輸入測試</h4>
        <div class="textarea-group">
          <div class="textarea-item">
            <label>基本文字區域：</label>
            <ud-textarea 
              v-model="basicTextarea" 
              placeholder="請輸入文字"
              @input="handleInputEvent('基本文字區域', $event)"
              @change="handleChangeEvent('基本文字區域', $event)"
              @enter="handleEnterEvent('基本文字區域', $event)"
            />
            <div class="textarea-value">值：{{ basicTextarea }}</div>
          </div>
          
          <div class="textarea-item">
            <label>多行文字區域：</label>
            <ud-textarea 
              v-model="multiLineTextarea" 
              :rows="6"
              placeholder="請輸入多行文字"
            />
            <div class="textarea-value">值：{{ multiLineTextarea }}</div>
          </div>
        </div>
      </div>

      <!-- 行數測試 -->
      <div class="textarea-subsection">
        <h4>行數測試</h4>
        <div class="textarea-group">
          <div class="textarea-item">
            <label>2行文字區域：</label>
            <ud-textarea 
              v-model="rows2Textarea" 
              :rows="2"
              placeholder="2行高度"
            />
            <div class="textarea-value">值：{{ rows2Textarea }}</div>
          </div>
          
          <div class="textarea-item">
            <label>4行文字區域（預設）：</label>
            <ud-textarea 
              v-model="rows4Textarea" 
              :rows="4"
              placeholder="4行高度（預設）"
            />
            <div class="textarea-value">值：{{ rows4Textarea }}</div>
          </div>
          
          <div class="textarea-item">
            <label>8行文字區域：</label>
            <ud-textarea 
              v-model="rows8Textarea" 
              :rows="8"
              placeholder="8行高度"
            />
            <div class="textarea-value">值：{{ rows8Textarea }}</div>
          </div>
        </div>
      </div>

      <!-- 調整大小測試 -->
      <div class="textarea-subsection">
        <h4>調整大小測試</h4>
        <div class="textarea-group">
          <div class="textarea-item">
            <label>可調整大小（預設）：</label>
            <ud-textarea 
              v-model="resizableTextarea" 
              placeholder="可以拖拽調整大小"
            />
            <div class="textarea-value">值：{{ resizableTextarea }}</div>
          </div>
          
          <div class="textarea-item">
            <label>禁止調整大小：</label>
            <ud-textarea 
              v-model="noResizeTextarea" 
              :no-resize="true"
              placeholder="無法調整大小"
            />
            <div class="textarea-value">值：{{ noResizeTextarea }}</div>
          </div>
        </div>
      </div>

      <!-- 字數限制測試 -->
      <div class="textarea-subsection">
        <h4>字數限制測試</h4>
        <div class="textarea-group">
          <div class="textarea-item">
            <label>顯示字數限制（100字）：</label>
            <ud-textarea 
              v-model="limitTextarea" 
              :show-limit="true"
              :limit="100"
              placeholder="最多輸入100個字符"
              maxlength="100"
            />
            <div class="textarea-value">值：{{ limitTextarea }} (長度：{{ limitTextarea.length }}/100)</div>
          </div>
          
          <div class="textarea-item">
            <label>顯示字數限制（200字）：</label>
            <ud-textarea 
              v-model="limit200Textarea" 
              :show-limit="true"
              :limit="200"
              placeholder="最多輸入200個字符"
              maxlength="200"
            />
            <div class="textarea-value">值：{{ limit200Textarea }} (長度：{{ limit200Textarea.length }}/200)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- UdAlert 測試 -->
    <section class="test-section">
      <h3>UdAlert 測試</h3>
      <div class="button-group">
        <ud-button @click="showBasicAlert">基本 Alert</ud-button>
        <ud-button @click="showConfirmAlert">確認 Alert</ud-button>
        <ud-button @click="showCustomAlert">自定義 Alert</ud-button>
        <ud-button @click="showHtmlAlert">HTML Alert</ud-button>
      </div>
      <div class="result-area">
        <h4>Alert 結果：{{ alertResult }}</h4>
      </div>
    </section>

    <!-- UdModal 測試 -->
    <section class="test-section">
      <h3>UdModal 測試</h3>
      <div class="button-group">
        <ud-button @click="showBasicModal">基本 Modal</ud-button>
        <ud-button @click="showFullScreenModal">全螢幕 Modal</ud-button>
        <ud-button @click="showCustomModal">自定義 Modal</ud-button>
        <ud-button @click="showSlotModal">插槽 Modal</ud-button>
      </div>
      
      <!-- Modal 組件 -->
      <ud-modal v-model="basicModalShow" title="基本 Modal" message="這是一個基本的 Modal">
      </ud-modal>
      
      <ud-modal v-model="fullScreenModalShow" title="全螢幕 Modal" message="這是一個全螢幕的 Modal" full-screen>
      </ud-modal>
      
      <ud-modal v-model="customModalShow" title="自定義 Modal" message="這是一個自定義的 Modal" btn-close mask-close>
      </ud-modal>
      
      <ud-modal v-model="slotModalShow" title="插槽 Modal">
        <div class="modal-content">
          <h4>自定義內容</h4>
          <p>這是使用插槽的自定義內容</p>
          <ud-input v-model="modalInput" placeholder="在 Modal 中的輸入框"></ud-input>
          <div class="modal-buttons">
            <ud-button @click="slotModalShow = false" plain>取消</ud-button>
            <ud-button @click="handleSlotModalConfirm">確認</ud-button>
          </div>
        </div>
      </ud-modal>
    </section>

    <!-- UdLoading 測試 -->
    <section class="test-section">
      <h3>UdLoading 測試</h3>
      <div class="button-group">
        <ud-button @click="showBasicLoading">基本 Loading</ud-button>
        <ud-button @click="showWhiteLoading">白色主題 Loading</ud-button>
        <ud-button @click="showFontLoading">字體圖標 Loading</ud-button>
        <ud-button @click="showImageLoading">圖片圖標 Loading</ud-button>
      </div>
    </section>

    <!-- UdArrow 測試 -->
    <section class="test-section">
      <h3>UdArrow 測試</h3>
      <div class="arrow-group">
        <div class="arrow-item">
          <label>方向測試：</label>
          <div class="arrow-demo">
            <ud-arrow direction="up" color="#007bff" :size="12" :width="6" type="solid"></ud-arrow>
            <ud-arrow direction="down" color="#28a745" :size="12" :width="6" type="solid"></ud-arrow>
            <ud-arrow direction="left" color="#dc3545" :size="12" :width="6" type="solid"></ud-arrow>
            <ud-arrow direction="right" color="#ffc107" :size="12" :width="6" type="solid"></ud-arrow>
          </div>
        </div>
        <div class="arrow-item">
          <label>類型測試：</label>
          <div class="arrow-demo">
            <ud-arrow direction="right" color="#007bff" :size="12" :width="6" type="solid"></ud-arrow>
            <ud-arrow direction="right" color="#007bff" :size="12" :width="6" type="outline"></ud-arrow>
          </div>
        </div>
        <div class="arrow-item">
          <label>大小測試：</label>
          <div class="arrow-demo">
            <ud-arrow direction="right" color="#007bff" :size="8" :width="4" type="solid"></ud-arrow>
            <ud-arrow direction="right" color="#007bff" :size="12" :width="6" type="solid"></ud-arrow>
            <ud-arrow direction="right" color="#007bff" :size="16" :width="8" type="solid"></ud-arrow>
          </div>
        </div>
      </div>
    </section>

    <!-- UdCheckbox 測試 -->
    <section class="test-section">
      <h3>UdCheckbox 測試</h3>
      <div class="checkbox-group">
        <div class="checkbox-item">
          <label>單選框：</label>
          <ud-checkbox v-model="singleCheckbox" @change="handleCheckboxChange('單選', $event)">
            單選框選項
          </ud-checkbox>
          <div class="checkbox-value">值：{{ singleCheckbox }}</div>
        </div>
        
        <div class="checkbox-item">
          <label>多選框組：</label>
          <ud-checkbox 
            v-model="multipleCheckbox" 
            :options="checkboxOptions"
            @change="handleCheckboxChange('多選', $event)"
          />
          <div class="checkbox-value">值：{{ multipleCheckbox }}</div>
        </div>
      </div>
    </section>

    <!-- UdRadio 測試 -->
    <section class="test-section">
      <h3>UdRadio 測試</h3>
      <div class="radio-group">
        <div class="radio-item">
          <label>單選按鈕組：</label>
          <ud-radio 
            v-model="radioValue" 
            :options="radioOptions"
            @change="handleRadioChange"
          />
          <div class="radio-value">值：{{ radioValue }}</div>
        </div>
      </div>
    </section>

    <!-- UdSwitch 測試 -->
    <section class="test-section">
      <h3>UdSwitch 測試</h3>
      <div class="switch-group">
        <div class="switch-item">
          <label>基本開關：</label>
          <ud-switch v-model="switchValue" @change="handleSwitchChange" />
          <div class="switch-value">值：{{ switchValue }}</div>
        </div>
        
        <div class="switch-item">
          <label>自定義值開關：</label>
          <ud-switch 
            v-model="customSwitchValue" 
            active-value="啟用" 
            inactive-value="停用"
            @change="handleSwitchChange"
          />
          <div class="switch-value">值：{{ customSwitchValue }}</div>
        </div>
      </div>
    </section>

    <!-- UdSelect 測試 -->
    <section class="test-section">
      <h3>UdSelect 測試</h3>
      <div class="select-group">
        <div class="select-item">
          <label>基本下拉選單：</label>
          <ud-select 
            v-model="selectValue" 
            :options="selectOptions"
            @change="handleSelectChange"
          />
          <div class="select-value">值：{{ selectValue }}</div>
        </div>
        
        <div class="select-item">
          <label>分組下拉選單：</label>
          <ud-select 
            v-model="groupSelectValue" 
            :options="groupSelectOptions"
            @change="handleSelectChange"
          />
          <div class="select-value">值：{{ groupSelectValue }}</div>
        </div>
      </div>
    </section>

    <!-- UdSelectDate 測試 -->
    <section class="test-section">
      <h3>UdSelectDate 測試</h3>
      <div class="date-group">
        <div class="date-item">
          <label>基本日期選擇：</label>
          <ud-select-date v-model="dateValue" @change="handleDateChange" />
          <div class="date-value">值：{{ dateValue }}</div>
        </div>
        
        <div class="date-item">
          <label>ROC 日期選擇：</label>
          <ud-select-date v-model="rocDateValue" roc @change="handleDateChange" />
          <div class="date-value">值：{{ rocDateValue }}</div>
        </div>
      </div>
    </section>

    <!-- UdSelectTwzip 測試 -->
    <section class="test-section">
      <h3>UdSelectTwzip 測試</h3>
      <div class="twzip-group">
        <div class="twzip-item">
          <label>台灣郵遞區號：</label>
          <ud-select-twzip v-model="twzipValue" @change="handleTwzipChange" />
          <div class="twzip-value">值：{{ twzipValue }}</div>
        </div>
      </div>
    </section>

    <!-- UdCollapse 測試 -->
    <section class="test-section">
      <h3>UdCollapse 測試</h3>
      <div class="collapse-group">
        <div class="collapse-item">
          <label>摺疊容器：</label>
          <div class="collapse-demo">
            <ud-button @click="toggleCollapse">
              {{ isCollapsed ? '展開' : '摺疊' }} 內容
            </ud-button>
            <ud-collapse v-model="isCollapsed" :duration="0.3">
              <div class="collapse-content">
                <h4>摺疊內容</h4>
                <p>這是一個摺疊容器的內容。可以通過點擊按鈕來展開或摺疊。</p>
                <p>支援自定義動畫時長和內容。</p>
              </div>
            </ud-collapse>
          </div>
        </div>
      </div>
    </section>

    <!-- UdCountdown 測試 -->
    <section class="test-section">
      <h3>UdCountdown 測試</h3>
      <div class="countdown-group">
        <div class="countdown-item">
          <label>倒數計時器：</label>
          <ud-countdown 
            ref="countdown"
            :time="countdownTime" 
            type="second"
            @timeup="handleTimeup"
          />
          <div class="countdown-controls">
            <ud-button @click="startCountdown">開始</ud-button>
            <ud-button @click="pauseCountdown">暫停</ud-button>
            <ud-button @click="resetCountdown">重置</ud-button>
          </div>
        </div>
      </div>
    </section>

    <!-- UdEllipsis 測試 -->
    <section class="test-section">
      <h3>UdEllipsis 測試</h3>
      <div class="ellipsis-group">
        <div class="ellipsis-item">
          <label>單行省略：</label>
          <ud-ellipsis :max-line="1">
            這是一段很長的文字，當超過一行時會自動省略並顯示省略號。這是一段很長的文字，當超過一行時會自動省略並顯示省略號。
          </ud-ellipsis>
        </div>
        
        <div class="ellipsis-item">
          <label>多行省略（2行）：</label>
          <ud-ellipsis :max-line="2">
            這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。
          </ud-ellipsis>
        </div>
        
        <div class="ellipsis-item">
          <label>多行省略（3行）：</label>
          <ud-ellipsis :max-line="3">
            這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。這是一段很長的文字，當超過指定行數時會自動省略並顯示省略號。
          </ud-ellipsis>
        </div>
      </div>
    </section>

    <!-- UdHtml 測試 -->
    <section class="test-section">
      <h3>UdHtml 測試</h3>
      <div class="html-group">
        <div class="html-item">
          <label>HTML 內容渲染：</label>
          <ud-html :text="htmlContent" />
        </div>
        
        <div class="html-item">
          <label>自定義 HTML：</label>
          <ud-html :text="customHtmlContent" />
        </div>
      </div>
    </section>

    <!-- UdImage 測試 -->
    <section class="test-section">
      <h3>UdImage 測試</h3>
      <div class="image-group">
        <div class="image-item">
          <label>基本圖片：</label>
          <ud-image src="/src/assets/images/picture/01.jpg" alt="測試圖片" />
        </div>
        
        <div class="image-item">
          <label>自定義尺寸：</label>
          <ud-image 
            src="/src/assets/images/picture/02.jpg" 
            alt="測試圖片" 
            width="200" 
            height="150"
          />
        </div>
        
        <div class="image-item">
          <label>背景圖片：</label>
          <ud-image 
            src="/src/assets/images/picture/03.jpg" 
            alt="測試圖片" 
            bg-size="cover"
            width="200" 
            height="150"
          />
        </div>
      </div>
    </section>

    <!-- UdForm 測試 -->
    <section class="test-section">
      <h3>UdForm 測試</h3>
      <div class="form-group">
        <ud-form :rules="formRules" :model="formData" ref="testForm">
          <ud-form-item label="姓名" prop="name">
            <ud-input v-model="formData.name" placeholder="請輸入姓名" />
          </ud-form-item>
          
          <ud-form-item label="郵箱" prop="email">
            <ud-input v-model="formData.email" placeholder="請輸入郵箱" />
          </ud-form-item>
          
          <ud-form-item label="備註" prop="note">
            <ud-textarea v-model="formData.note" placeholder="請輸入備註" />
          </ud-form-item>
          
          <ud-form-item label="性別" prop="gender">
            <ud-radio v-model="formData.gender" :options="genderOptions" />
          </ud-form-item>
          
          <ud-form-item label="興趣" prop="interests">
            <ud-checkbox v-model="formData.interests" :options="interestOptions" />
          </ud-form-item>
          
          <ud-form-item label="城市" prop="city">
            <ud-select v-model="formData.city" :options="cityOptions" />
          </ud-form-item>
          
          <ud-form-item label="是否同意" prop="agree">
            <ud-switch v-model="formData.agree" />
          </ud-form-item>
        </ud-form>
        
        <div class="form-controls">
          <ud-button @click="validateForm">驗證表單</ud-button>
          <ud-button @click="clearForm" plain>清除表單</ud-button>
          <ud-button @click="resetForm" plain>重置表單</ud-button>
        </div>
        
        <div class="form-result">
          <h4>表單數據：</h4>
          <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    </section>

    <!-- 測試結果統計 -->
    <section class="test-section">
      <h3>測試結果統計</h3>
      <div class="result-area">
        <h4>事件統計：</h4>
        <p><strong>Button 測試：</strong></p>
        <p>最後點擊按鈕：{{ lastButtonClicked }}</p>
        <p>按鈕點擊次數：{{ buttonClickCount }}</p>
        <p>節流點擊次數：{{ throttleCount }}</p>
        <p>防抖點擊次數：{{ debounceCount }}</p>
        <p><strong>其他組件：</strong></p>
        <p>Alert 結果：{{ alertResult }}</p>
        <p>Checkbox 變更：{{ checkboxChangeCount }} 次</p>
        <p>Radio 變更：{{ radioChangeCount }} 次</p>
        <p>Switch 變更：{{ switchChangeCount }} 次</p>
        <p>Select 變更：{{ selectChangeCount }} 次</p>
        <p>Date 變更：{{ dateChangeCount }} 次</p>
        <p>Twzip 變更：{{ twzipChangeCount }} 次</p>
        <p>倒數計時完成：{{ timeupCount }} 次</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "UdComponentsTest",
  data() {
    return {
      // Button 測試
      buttonLoading: false,
      buttonLoading2: false,
      buttonClickLogs: [],
      lastButtonClicked: "無",
      buttonClickCount: 0,
      throttleCount: 0,
      debounceCount: 0,
      
      // Input 測試
      basicInput: "",
      centerInput: "",
      textInput: "",
      numberInput: "",
      emailInput: "",
      telInput: "",
      trimInput: "",
      numberModifierInput: "",
      lazyInput: "",
      
      // Textarea 測試
      basicTextarea: "",
      multiLineTextarea: "",
      rows2Textarea: "",
      rows4Textarea: "",
      rows8Textarea: "",
      resizableTextarea: "",
      noResizeTextarea: "",
      limitTextarea: "",
      limit200Textarea: "",
      
      // Alert 測試
      alertResult: "無",
      
      // Modal 測試
      basicModalShow: false,
      fullScreenModalShow: false,
      customModalShow: false,
      slotModalShow: false,
      modalInput: "",
      
      // Loading 測試
      loadingInstance: null,
      
      // Checkbox 測試
      singleCheckbox: false,
      multipleCheckbox: [],
      checkboxOptions: [
        { label: "選項1", value: "option1" },
        { label: "選項2", value: "option2" },
        { label: "選項3", value: "option3", disabled: true }
      ],
      
      // Radio 測試
      radioValue: "",
      radioOptions: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" }
      ],
      
      // Switch 測試
      switchValue: false,
      customSwitchValue: "停用",
      
      // Select 測試
      selectValue: "",
      groupSelectValue: "",
      selectOptions: [
        { label: "台北市", value: "taipei" },
        { label: "新北市", value: "newtaipei" },
        { label: "桃園市", value: "taoyuan" }
      ],
      groupSelectOptions: [
        {
          label: "北部",
          children: [
            { label: "台北市", value: "taipei" },
            { label: "新北市", value: "newtaipei" }
          ]
        },
        {
          label: "中部",
          children: [
            { label: "台中市", value: "taichung" },
            { label: "彰化縣", value: "changhua" }
          ]
        }
      ],
      
      // Date 測試
      dateValue: "",
      rocDateValue: "",
      
      // Twzip 測試
      twzipValue: ["", ""],
      
      // Collapse 測試
      isCollapsed: true,
      
      // Countdown 測試
      countdownTime: 60,
      
      // Form 測試
      formData: {
        name: "",
        email: "",
        note: "",
        gender: "",
        interests: [],
        city: "",
        agree: false
      },
      formRules: {
        name: [{ type: "required" }],
        email: [{ type: "required" }, { type: "email" }],
        gender: [{ type: "required" }],
        agree: [{ type: "required" }]
      },
      genderOptions: [
        { label: "男", value: "male" },
        { label: "女", value: "female" }
      ],
      interestOptions: [
        { label: "運動", value: "sports" },
        { label: "音樂", value: "music" },
        { label: "閱讀", value: "reading" }
      ],
      cityOptions: [
        { label: "台北市", value: "taipei" },
        { label: "新北市", value: "newtaipei" },
        { label: "桃園市", value: "taoyuan" }
      ],
      
      // HTML 內容
      htmlContent: "<h3>標題</h3><p>這是一段<strong>粗體</strong>和<em>斜體</em>的文字。</p><ul><li>列表項目1</li><li>列表項目2</li></ul>",
      customHtmlContent: "<div style='color: #007bff; font-size: 18px;'>自定義樣式的HTML內容</div><p style='background-color: #f8f9fa; padding: 10px;'>帶背景色的段落</p>",
      
      // 統計數據
      checkboxChangeCount: 0,
      radioChangeCount: 0,
      switchChangeCount: 0,
      selectChangeCount: 0,
      dateChangeCount: 0,
      twzipChangeCount: 0,
      timeupCount: 0
    };
  },
  methods: {
    // Button 方法
    handleButtonClick(buttonName) {
      this.lastButtonClicked = buttonName;
      this.buttonClickCount++;
      this.addButtonLog(`普通點擊: ${buttonName}`);
      console.log(`按鈕被點擊: ${buttonName}`);
    },
    
    toggleButtonLoading() {
      this.buttonLoading = !this.buttonLoading;
      if (this.buttonLoading) {
        setTimeout(() => {
          this.buttonLoading = false;
        }, 3000);
      }
    },
    
    toggleButtonLoading2() {
      this.buttonLoading2 = !this.buttonLoading2;
      if (this.buttonLoading2) {
        setTimeout(() => {
          this.buttonLoading2 = false;
        }, 2000);
      }
    },
    
    handleThrottleClick() {
      this.throttleCount++;
      this.addButtonLog(`節流點擊: ${new Date().toLocaleTimeString()}`);
      console.log("節流按鈕被點擊");
    },
    
    handleDebounceClick() {
      this.debounceCount++;
      this.addButtonLog(`防抖點擊: ${new Date().toLocaleTimeString()}`);
      console.log("防抖按鈕被點擊");
    },
    
    handleNormalClick() {
      this.addButtonLog(`普通點擊: ${new Date().toLocaleTimeString()}`);
      console.log("普通按鈕被點擊");
    },
    
    addButtonLog(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.buttonClickLogs.unshift(`[${timestamp}] ${message}`);
      if (this.buttonClickLogs.length > 10) {
        this.buttonClickLogs.pop();
      }
    },
    
    // Input 方法
    handleInputEvent(source, value) {
      console.log(`${source} - Input 事件:`, value);
    },
    
    handleChangeEvent(source, value) {
      console.log(`${source} - Change 事件:`, value);
    },
    
    handleEnterEvent(source, value) {
      console.log(`${source} - Enter 事件:`, value);
    },
    
    // Alert 方法
    async showBasicAlert() {
      try {
        const result = await this.udAlert("這是一個基本的 Alert");
        this.alertResult = `基本 Alert: ${result}`;
      } catch (error) {
        this.alertResult = `基本 Alert: ${error}`;
      }
    },
    
    async showConfirmAlert() {
      try {
        const result = await this.udAlert({
          title: "確認對話框",
          msg: "您確定要執行此操作嗎？",
          confirm: true
        });
        this.alertResult = `確認 Alert: ${result}`;
      } catch (error) {
        this.alertResult = `確認 Alert: ${error}`;
      }
    },
    
    async showCustomAlert() {
      try {
        const result = await this.udAlert({
          title: "自定義 Alert",
          msg: "這是一個自定義的 Alert",
          confirm: true,
          confirmText: "好的",
          cancelText: "取消"
        });
        this.alertResult = `自定義 Alert: ${result}`;
      } catch (error) {
        this.alertResult = `自定義 Alert: ${error}`;
      }
    },
    
    async showHtmlAlert() {
      try {
        const result = await this.udAlert({
          title: "HTML Alert",
          msg: "這是一個包含<strong>HTML</strong>的Alert<br/>支援<em>多行</em>文字"
        });
        this.alertResult = `HTML Alert: ${result}`;
      } catch (error) {
        this.alertResult = `HTML Alert: ${error}`;
      }
    },
    
    // Modal 方法
    showBasicModal() {
      this.basicModalShow = true;
    },
    
    showFullScreenModal() {
      this.fullScreenModalShow = true;
    },
    
    showCustomModal() {
      this.customModalShow = true;
    },
    
    showSlotModal() {
      this.slotModalShow = true;
    },
    
    handleSlotModalConfirm() {
      this.udAlert(`您輸入的內容是：${this.modalInput}`);
      this.slotModalShow = false;
    },
    
    // Loading 方法
    showBasicLoading() {
      this.udLoading.open();
      setTimeout(() => {
        this.udLoading.close();
      }, 2000);
    },
    
    showWhiteLoading() {
      this.udLoading.open({ theme: "white", msg: "白色主題載入中..." });
      setTimeout(() => {
        this.udLoading.close();
      }, 2000);
    },
    
    showFontLoading() {
      this.udLoading.open({ 
        iconType: "font", 
        iconFont: "fas fa-spinner fa-pulse",
        msg: "字體圖標載入中..." 
      });
      setTimeout(() => {
        this.udLoading.close();
      }, 2000);
    },
    
    showImageLoading() {
      this.udLoading.open({ 
        iconType: "img", 
        iconImg: "/src/assets/images/icon/refresh.png",
        msg: "圖片圖標載入中..." 
      });
      setTimeout(() => {
        this.udLoading.close();
      }, 2000);
    },
    
    // 事件處理方法
    handleCheckboxChange(source, value) {
      this.checkboxChangeCount++;
      console.log(`${source} Checkbox 變更:`, value);
    },
    
    handleRadioChange(value) {
      this.radioChangeCount++;
      console.log("Radio 變更:", value);
    },
    
    handleSwitchChange(value) {
      this.switchChangeCount++;
      console.log("Switch 變更:", value);
    },
    
    handleSelectChange(value) {
      this.selectChangeCount++;
      console.log("Select 變更:", value);
    },
    
    handleDateChange(value) {
      this.dateChangeCount++;
      console.log("Date 變更:", value);
    },
    
    handleTwzipChange(value) {
      this.twzipChangeCount++;
      console.log("Twzip 變更:", value);
    },
    
    handleTimeup() {
      this.timeupCount++;
      console.log("倒數計時完成！");
      this.udAlert("倒數計時完成！");
    },
    
    // Collapse 方法
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    
    // Countdown 方法
    startCountdown() {
      this.$refs.countdown.countdown();
    },
    
    pauseCountdown() {
      this.$refs.countdown.pause();
    },
    
    resetCountdown() {
      this.$refs.countdown.reset();
    },
    
    // Form 方法
    validateForm() {
      this.$refs.testForm.validate(() => {
        this.udAlert("表單驗證成功！");
      });
    },
    
    clearForm() {
      this.$refs.testForm.clearValidate();
    },
    
    resetForm() {
      this.formData = {
        name: "",
        email: "",
        note: "",
        gender: "",
        interests: [],
        city: "",
        agree: false
      };
      this.$refs.testForm.clearValidate();
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-components-test
  padding: 20px
  max-width: 1200px
  margin: 0 auto

.test-section
  margin-bottom: 40px
  padding: 20px
  border: 1px solid #eee
  border-radius: 8px
  background-color: #fafafa

  h3
    margin-top: 0
    margin-bottom: 20px
    color: #333
    border-bottom: 2px solid #007bff
    padding-bottom: 10px

.button-group
  display: flex
  flex-wrap: wrap
  gap: 10px
  margin-bottom: 20px

  .ud-button
    min-width: 120px

.button-subsection, .input-subsection, .textarea-subsection
  margin-bottom: 30px
  padding: 15px
  background-color: #fff
  border-radius: 5px
  border: 1px solid #e9ecef

  h4
    margin-top: 0
    margin-bottom: 15px
    color: #495057
    font-size: 16px
    border-bottom: 1px solid #dee2e6
    padding-bottom: 5px

.input-group, .textarea-group
  display: flex
  flex-direction: column
  gap: 15px

.input-item, .textarea-item
  display: flex
  flex-direction: column
  gap: 8px

  label
    font-weight: bold
    color: #555
    font-size: 14px

  .ud-input, .ud-textarea
    width: 100%

  .input-value, .textarea-value
    font-size: 12px
    color: #666
    background-color: #f8f9fa
    padding: 5px 10px
    border-radius: 3px
    border: 1px solid #e9ecef
    word-break: break-all

.click-log
  background-color: #f8f9fa
  padding: 15px
  border-radius: 5px
  border: 1px solid #dee2e6
  margin-top: 15px

  h5
    margin-top: 0
    margin-bottom: 10px
    color: #495057

  .log-item
    padding: 3px 0
    border-bottom: 1px solid #e9ecef
    font-family: monospace
    font-size: 12px
    color: #6c757d

    &:last-child
      border-bottom: none

.arrow-group, .checkbox-group, .radio-group, .switch-group, .select-group, .date-group, .twzip-group, .collapse-group, .countdown-group, .ellipsis-group, .html-group, .image-group, .form-group
  display: flex
  flex-direction: column
  gap: 20px

.arrow-item, .checkbox-item, .radio-item, .switch-item, .select-item, .date-item, .twzip-item, .collapse-item, .countdown-item, .ellipsis-item, .html-item, .image-item
  display: flex
  flex-direction: column
  gap: 8px

  label
    font-weight: bold
    color: #555
    font-size: 14px

.arrow-demo
  display: flex
  align-items: center
  gap: 20px
  padding: 10px
  background-color: #f8f9fa
  border-radius: 5px

.checkbox-value, .radio-value, .switch-value, .select-value, .date-value, .twzip-value
  font-size: 12px
  color: #666
  background-color: #f8f9fa
  padding: 5px 10px
  border-radius: 3px
  border: 1px solid #e9ecef

.collapse-demo
  border: 1px solid #dee2e6
  border-radius: 5px
  overflow: hidden

  .ud-button
    width: 100%
    border-radius: 0

  .collapse-content
    padding: 15px
    background-color: #f8f9fa

.countdown-controls
  display: flex
  gap: 10px
  margin-top: 10px

  .ud-button
    flex: 1

.modal-content
  padding: 20px

  .modal-buttons
    display: flex
    gap: 10px
    margin-top: 20px

    .ud-button
      flex: 1

.form-controls
  display: flex
  gap: 10px
  margin: 20px 0

  .ud-button
    flex: 1

.form-result
  background-color: #f8f9fa
  padding: 15px
  border-radius: 5px
  border: 1px solid #dee2e6

  h4
    margin-top: 0
    margin-bottom: 10px
    color: #495057

  pre
    background-color: #fff
    padding: 10px
    border-radius: 3px
    border: 1px solid #e9ecef
    font-size: 12px
    overflow-x: auto

.result-area
  background-color: #e7f3ff
  padding: 20px
  border-radius: 5px
  border: 1px solid #b3d9ff

  h4
    margin-top: 0
    margin-bottom: 15px
    color: #0056b3

  p
    margin: 5px 0
    color: #0056b3

@media (max-width: 768px)
  .ud-components-test
    padding: 10px

  .test-section
    padding: 15px

  .button-group
    flex-direction: column

  .arrow-demo
    flex-wrap: wrap
    gap: 10px

  .countdown-controls, .form-controls
    flex-direction: column
</style>
