#### How to install admin project
<ol>
    <li><code>npm install</code></li>
    <li><code>npm run dev</code></li>
</ol>

=====================================================

#### How to install api project
<ol>
    <li><code>composer update</code></li>
    <li><code>composer install</code></li>
    <li><code>cp .env.example .env</code></li>
    <li><code>php artisan key:generate</code></li>
    <li><code>php artisan migrate</code></li>
    <li><code>php artisan db:seed --force</code></li>
    <li><code>composer run dev</code></li>
</ol>