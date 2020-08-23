const url = location.href;

const rootUrl = "https://www.pochit.me/";

const result = url.match(/dp\/([0-9A-Z]{10})/) || url.match(/gp\/product\/([0-9A-Z]{10})/);

const utm = {
  source: "amazon",
  media: "amazon_web",
};

if (result !== null) {
  const itemCode = result[1];

  const title = document.querySelector("span#productTitle").textContent.trim();

  fetch(`${rootUrl}products/${itemCode}`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: new Headers({ "Content-type": "application/json" }),
  }).then(res => console.log(res));

  //var redirect_url = "https://pochit.me/products/" + item_code + UTM info;
  const redirectUrl = (campaignName: string) =>
    `${rootUrl}products/${itemCode}?title=${title}&utm_source=${utm.source}&utm_media=${utm.source}&utm_campaign=${campaignName}`;

  //
  // タイトル直下のテキストリンク生成
  //

  const div_element = document.createElement("div");
  div_element.className = "feature";

  div_element.innerHTML = `
    <span class="askPipe"> | </span>
    <span id="submit.add-to-cart-announce" class="a-size-base" aria-hidden="true">
      <a href="${redirectUrl("under_title")}" class="read-blog-review">ブログレビューを読む<a>
    </span>`;

  const parent_object = document.getElementById("averageCustomerReviews_feature_div");

  if (parent_object != null) {
    parent_object.parentNode.insertBefore(div_element, parent_object.nextSibling);
  }

  //
  // カスタマーレビューレーティング直下のボタンリンク生成
  //

  const customerReviewNode = document.getElementsByClassName("cr-widget-Histogram")[0];
  if (customerReviewNode) {
    const buttonLinkNode = document.createElement("div");
    buttonLinkNode.className = "review-button-link";
    buttonLinkNode.innerHTML = `
      <div class="a-row">
        <span class="a-button a-button-base writeReviewButton cm-cr-button-wide" style="margin-top: 18px;">
          <span class="a-button-inner">
            <a href="${redirectUrl(
              "under_customer_review_rating"
            )}" class="a-button-text read-blog-review">他サイトのレビュー記事を読む<a>
          </span>
        </span>
      </div>
    `;

    customerReviewNode.parentNode.insertBefore(buttonLinkNode, customerReviewNode.nextSibling);
  }

  //
  // ほしいものボタン上にボタンリンク生成
  //
  const wishlistButtonNode = document.getElementById("wishlistButtonStack");
  if (wishlistButtonNode) {
    const buttonLinkNode = document.createElement("div");
    buttonLinkNode.className = "review-button-link";
    buttonLinkNode.innerHTML = `
      <div class="a-row" style="padding: 0 18px 12px 18px;">
        <span class="a-button a-button-base a-button-group writeReviewButton" style="width: 100%;">
          <span class="a-button-inner">
            <a href="${redirectUrl(
              "up_wishlist_button"
            )}" class="a-button-text read-blog-review">他サイトのレビューを読む<a>
          </span>
        </span>
      </div>
    `;

    wishlistButtonNode.parentNode.insertBefore(buttonLinkNode, wishlistButtonNode);
  }

  //
  // 画像下にテキストリンク生成
  //
  const imageBlockThumbsNode = document.getElementById("imageBlockThumbs");
  if (imageBlockThumbsNode) {
    const linkNode = document.createElement("div");
    linkNode.innerHTML = `
      <span class="a-size-base">
        <a href="${redirectUrl("under_image")}" class="read-blog-review">他サイトのレビューを読む<a>
      </span>
    `;

    imageBlockThumbsNode.parentNode.insertBefore(linkNode, imageBlockThumbsNode.nextSibling);
  }

  //
  // よく一緒に購入されている商品下にテキストリンク生成
  //
  const ProductsPurchasedTogetherNode = document.getElementById("sims-fbt-content");
  if (ProductsPurchasedTogetherNode) {
    const linkNode = document.createElement("div");
    linkNode.innerHTML = `
      <span class="a-size-base">
        <a href="${redirectUrl(
          "under_products_purchased_together"
        )}" class="read-blog-review">他サイトのレビューを読む<a>
      </span>
    `;

    ProductsPurchasedTogetherNode.parentNode.insertBefore(linkNode, ProductsPurchasedTogetherNode.nextSibling);
  }

  //
  // カルーセル下にテキストリンク生成
  //
  const carouselNodes = document.getElementsByClassName("a-carousel-row");
  if (carouselNodes) {
    Array.from(carouselNodes).forEach((node, index) => {
      const linkNode = document.createElement("div");
      linkNode.style.cssText = "margin-top: 10px;";
      linkNode.innerHTML = `
      <span class="a-size-base">
        <a href="${redirectUrl(`under_carousel_${index}`)}" class="read-blog-review">他サイトのレビューを読む<a>
      </span>
    `;
      node.parentNode.insertBefore(linkNode, node.nextSibling);
    });
  }

  //
  // 商品の説明の下にテキストリンク生成
  //
  const productDescriptionNode = document.getElementById("productDescription");
  if (productDescriptionNode) {
    const linkNode = document.createElement("div");
    linkNode.innerHTML = `
      <span class="a-size-base">
        <a href="${redirectUrl("under_product_description")}" class="read-blog-review">他サイトのレビューを読む<a>
      </span>
    `;

    productDescriptionNode.parentNode.insertBefore(linkNode, productDescriptionNode.nextSibling);
  }

  const googleAnalyticsTag = document.createElement("script");
  googleAnalyticsTag.innerHTML = `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-130233267-1', 'auto');
  ga('send', {
    hitType: 'event',
    eventCategory: 'PageView',
    eventAction: 'AmazonProductPage',
  })

  function addListener(element, type, callback) {
    if (element.addEventListener) element.addEventListener(type, callback);
    else if (element.attachEvent) element.attachEvent('on' + type, callback);
  }

  Array.from(document.getElementsByClassName('read-blog-review')).forEach(node => {
    addListener(
      node,
      'click', function() {
        ga('send', {
          hitType: 'event',
          eventCategory: 'LinkClick',
          eventAction: 'JumpToPochit',
        });
      }
    );
  })

  Array.from(document.getElementsByClassName('a-carousel-card')).forEach(node => {
    addListener(
      node,
      'click', function() {
        ga('send', {
          hitType: 'event',
          eventCategory: 'LinkClick',
          eventAction: 'JumpToOtherProductPage',
        });
      }
    );
  })

  addListener(
    document.getElementById('add-to-cart-button'),
    'click', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'LinkClick',
        eventAction: 'AddToCart',
      });
    }
  );
`;

  var head = document.getElementsByTagName("head")[0];
  head.insertBefore(googleAnalyticsTag, head.firstChild);
}
