import React from 'react';

function ProductForm({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onBrandChange,
}) {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="填入商品品牌或關鍵字"
        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      />
      <select
        onChange={onBrandChange}
        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <option value="">或直接選擇品牌</option>
        <option value="irontech">Irontech 鐵藝</option>
        <option value="rzr">RZR 人造人</option>
        <option value="bqdoll">BQDoll 伴趣</option>
        <option value="butterfly">Butterfly 蝴蝶</option>
        <option value="cando">Cando 可嘟</option>
        <option value="climax">Climax 卡羅漫</option>
        <option value="dollsenior">Dollsenior 學姐</option>
        <option value="elsababe">Elsababe 愛莎貝兒</option>
        <option value="exdoll">EXdoll EX</option>
        <option value="fenreal">Fenreal 凡瑞</option>
        <option value="fudoll">Fudoll 芙朵</option>
        <option value="game lady">Gamelady </option>
        <option value="guava">Guava 番石榴</option>
        <option value="jcute">Jcute</option>
        <option value="js">JS 玖盛</option>
        <option value="jy">JY 俊影</option>
        <option value="lace">LACE 蕾絲</option>
        <option value="mlw">MLW 蘿莉夫人</option>
        <option value="mozu">MOZU 魔族人形</option>
        <option value="reallady">Reallady</option>
        <option value="sankaku">Sankaku 三角</option>
        <option value="shedoll">Shedoll </option>
        <option value="sigafun">Sigafun </option>
        <option value="starpery">Starpery 星辰</option>
        <option value="wmdoll">WMdoll </option>
        <option value="yearn">Yearn 翼天使</option>
        <option value="yuedoll">Yuedoll 悅人</option>
        <option value="cst">春水堂 </option>
        <option value="口袋女友">口袋女友 </option>
        <option value="螢火日記">螢火日記 </option>
        <option value="安迪伊娃">安迪伊娃 </option>
        <option value="米諾娃">米諾娃 </option>
      </select>
      <select
        value={filter}
        onChange={onFilterChange}
        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <option value="all">默認全選</option>
        <option value="Empty">僅顯示有資料部分</option>
        <option value="notEmpty">僅顯示無資料部分</option>
      </select>
    </div>
  );
}

export default ProductForm;
